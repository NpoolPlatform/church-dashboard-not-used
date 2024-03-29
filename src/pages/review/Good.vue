<template>
  <q-table
    flat
    dense
    :loading='goodReviewsLoading'
    :rows='goodReviews'
    @row-click='(evt, row, index) => onRowClick(evt, row, index)'
  />
</template>

<script setup lang='ts'>
import { onMounted, onUnmounted, computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from '../../store'
import { ModuleKey, Type as NotificationType } from '../../store/notifications/const'
import { MutationTypes as ReviewMutationTypes } from '../../store/reviews/mutation-types'
import { ActionTypes as ReviewActionTypes } from '../../store/reviews/action-types'
import { FunctionVoid } from '../../types/types'
import { MutationTypes as NotificationMutationTypes } from '../../store/notifications/mutation-types'
import { notify, notificationPop } from '../../store/notifications/helper'
import { Review } from 'src/store/reviews/types'
import { LooseDictionary } from 'quasar'

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const goodReviews = computed(() => {
  const reviews = [] as Array<Review>
  store.getters.getGoodReviews.forEach((review) => {
    reviews.push(review.Review)
  })
  return reviews
})
const goodReviewsLoading = ref(false)

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  goodReviewsLoading.value = true
  store.dispatch(ReviewActionTypes.GetGoodReviews, {
    Message: {
      ModuleKey: ModuleKey.ModuleReviews,
      Error: {
        Title: t('MSG_GET_ALL_GOODS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === NotificationMutationTypes.Push) {
      goodReviewsLoading.value = false
      const notification = store.getters.peekNotification(ModuleKey.ModuleReviews)
      if (notification) {
        notify(notification)
        store.commit(NotificationMutationTypes.Pop, notificationPop(notification))
      }
    }

    if (mutation.type === ReviewMutationTypes.SetGoodReviews) {
      goodReviewsLoading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

const onRowClick = (evt: LooseDictionary, row: LooseDictionary, index: number) => {
  console.log(evt, row, index)
}

</script>
