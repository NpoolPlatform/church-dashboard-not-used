<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='accounts'
    @row-click='(evt, row, index) => onRowClick(row as CoinAccount)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateCoinAccountClick'>
          {{ $t('MSG_CREATE_COIN_ACCOUNT') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-table
    v-model:selected='selectedGood'
    row-key='ID'
    flat
    dense
    :rows='allGoods'
    selection='single'
  />
  <q-table
    flat
    dense
    :rows='goodBenefit ? [goodBenefit] : []'
  />
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
    @hide='onMenuHide'
  />
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as AccountsMutationTypes } from 'src/store/accounts/mutation-types'
import { ActionTypes as AccountsActionTypes } from 'src/store/accounts/action-types'
import { CoinAccount } from 'src/store/accounts/types'
import { GoodBase } from 'src/store/goods/types'
import { ActionTypes as GoodActionTypes } from 'src/store/goods/action-types'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const loading = ref(true)
const adding = ref(false)
const updating = ref(false)
const modifying = ref(false)

const accounts = computed(() => store.getters.getCoinAccounts)
const selectedAccount = ref()

const onRowClick = (row: CoinAccount) => {
  selectedAccount.value = row
  updating.value = true
  modifying.value = true
}

const onCreateCoinAccountClick = () => {
  selectedAccount.value = undefined
  adding.value = true
  modifying.value = true
}

const allGoods = computed(() => {
  const goods = [] as Array<GoodBase>
  store.getters.getAllGoods.forEach((good) => {
    goods.push(good.Good)
  })
  return goods
})
const selectedGood = ref([] as Array<GoodBase>)
watch(selectedGood, () => {
  selectedGood.value.forEach((good) => {
    store.dispatch(AccountsActionTypes.GetGoodBenefitByGood, {
      GoodID: good.ID as string,
      Message: {
        ModuleKey: ModuleKey.ModuleGoods,
        Error: {
          Title: t('MSG_GET_GOOD_BENEFIT_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
})
const goodBenefit = computed(() => {
  return selectedGood.value && selectedGood.value.length > 0 ? store.getters.getGoodBenefitByGood(selectedGood.value[0].ID as string) : undefined
})

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(GoodActionTypes.GetAllGoods, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_ALL_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(AccountsActionTypes.GetCoinAccounts, {
    Message: {
      ModuleKey: ModuleKey.ModuleGoods,
      Error: {
        Title: t('MSG_GET_COIN_ACCOUNTS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === AccountsMutationTypes.SetCoinAccounts) {
      loading.value = false
    }

    if (mutation.type === NotificationMutationTypes.Push) {
      const notification = store.getters.peekNotification(ModuleKey.ModuleApplications)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const onMenuHide = () => {
  adding.value = false
  updating.value = false
  modifying.value = false
}

</script>