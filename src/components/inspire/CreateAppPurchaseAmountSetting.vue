<template>
  <q-card class='container'>
    <q-card-section>
      <q-item-label>{{ $t('MSG_CREATE_APP_PURCHASE_AMOUNT_SETTING') }}</q-item-label>
    </q-card-section>
    <q-item-section>
      <q-item>
        <q-item-label>{{ $t('MSG_APP_NAME') }}: {{ selectedApp?.App.Name }}</q-item-label>
      </q-item>
      <q-item>
        <q-item-label>{{ $t('MSG_USERNAME') }}: {{ selectedUser?.EmailAddress }}</q-item-label>
      </q-item>
      <q-input
        v-model='amount'
        :label='$t("MSG_PURCHASE_AMOUNT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='percent'
        :label='$t("MSG_COMMISSION_PERCENT")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='title'
        :label='$t("MSG_USER_TITLE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='badgeLarge'
        :label='$t("MSG_BADGE_LARGE")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='badgeSmall'
        :label='$t("MSG_BADGE_SMALL")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='start'
        :label='$t("MSG_START_TIME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
      <q-input
        v-model='end'
        :label='$t("MSG_END_TIME")'
      >
        <template #prepend>
          <q-icon name='window' />
        </template>
      </q-input>
    </q-item-section>
    <q-item-section>
      <q-btn
        class='submit-btn'
        :label='$t("MSG_SUBMIT")'
        @click='onSubmit'
      />
    </q-item-section>
  </q-card>
</template>

<script setup lang='ts'>
import { defineProps, toRef, computed, defineEmits, watch, ref } from 'vue'
import { Application } from 'src/store/applications/types'
import { AppPurchaseAmountSetting } from 'src/store/inspire/types'
import { AppUser } from 'src/store/user-helper/types'

interface Props {
  selectedApp?: Application
  selectedUser?: AppUser
  editSetting?: AppPurchaseAmountSetting
}

const props = defineProps<Props>()

const selectedApp = toRef(props, 'selectedApp')
const editSetting = toRef(props, 'editSetting')
const selectedUser = toRef(props, 'selectedUser')

const editAmount = computed(() => {
  return editSetting.value ? editSetting.value.Amount : 0
})
const amount = ref(editAmount.value)

const editPercent = computed(() => {
  return editSetting.value ? editSetting.value.Percent : 1
})
const percent = ref(editPercent.value)

const editTitle = computed(() => {
  return editSetting.value ? editSetting.value.Title : 'NOT SET'
})
const title = ref(editTitle.value)

const editBadgeLarge = computed(() => {
  return editSetting.value ? editSetting.value.BadgeLarge : 'NOT SET'
})
const badgeLarge = ref(editBadgeLarge.value)

const editBadgeSmall = computed(() => {
  return editSetting.value ? editSetting.value.BadgeSmall : 'NOT SET'
})
const badgeSmall = ref(editBadgeSmall.value)

const editStart = computed(() => {
  return editSetting.value && editSetting.value.Start ? editSetting.value.Start : (new Date().getTime() / 1000 + 60).toFixed(0)
})
const start = ref(editStart.value)

const editEnd = computed(() => {
  return editSetting.value && editSetting.value.End ? editSetting.value.End : (new Date().getTime() / 1000 + 60 * 24 * 60 * 60).toFixed(0)
})
const end = ref(editEnd.value)

const editID = computed(() => {
  return editSetting.value ? editSetting.value.ID : undefined
})
const id = ref(editID.value)

const setting = computed(() => {
  return {
    ID: id.value as string,
    AppID: selectedApp.value?.App.ID,
    Amount: amount.value,
    Percent: percent.value,
    Title: title.value,
    BadgeLarge: badgeLarge.value,
    BadgeSmall: badgeSmall.value,
    Start: start.value,
    End: end.value
  } as AppPurchaseAmountSetting
})

watch(setting, () => {
  emit('update', setting.value)
})

const emit = defineEmits<{(e: 'submit', info: AppPurchaseAmountSetting): void,
  (e: 'update', info: AppPurchaseAmountSetting): void
}>()

const onSubmit = () => {
  emit('submit', setting.value)
}

</script>

<style lang='sass' scoped>
.container
  padding: 24px
  min-width: 800px

.submit-btn
  margin-top: 24px
  background-color: $blue-6
  color: white
</style>
