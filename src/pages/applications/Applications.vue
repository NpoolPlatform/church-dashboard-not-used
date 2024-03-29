<template>
  <q-table
    flat
    dense
    :loading='loading'
    :rows='myApps'
    @row-click='(evt, row, index) => onRowClick(row as App)'
  >
    <template #top-right>
      <div class='row'>
        <q-space />
        <q-btn dense @click='onCreateApplication'>
          {{ $t('MSG_CREATE_APPLICATION') }}
        </q-btn>
      </div>
    </template>
  </q-table>
  <q-dialog
    v-model='modifying'
    position='right'
    full-width
    square
    no-shake
    @hide='onMenuHide'
  >
    <CreateApplication :selected-app='selectedApp' @update='onUpdate' @submit='onSubmit' />
  </q-dialog>
</template>

<script setup lang='ts'>
import { onMounted, ref, computed, onUnmounted, defineAsyncComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import { useStore } from 'src/store'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { MutationTypes as ApplicationMutationTypes } from 'src/store/applications/mutation-types'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { MutationTypes as NotificationMutationTypes } from 'src/store/notifications/mutation-types'
import { notify, notificationPop } from 'src/store/notifications/helper'
import { FunctionVoid } from 'src/types/types'
import { App, Application } from 'src/store/applications/types'

const CreateApplication = defineAsyncComponent(() => import('src/components/application/CreateApplication.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const applications = computed(() => store.getters.getApplications)
const myApps = computed(() => {
  const apps = [] as Array<App>
  applications.value.forEach((app) => {
    apps.push(app.App)
  })
  return apps
})

const loading = ref(true)
const creating = ref(false)
const updating = ref(false)
const modifying = ref(false)
const selectedApp = ref({} as Application)

const onUpdate = (app: Application) => {
  // TODO: fileter the list
  console.log('update', app)
}

const onSubmit = (app: Application) => {
  let appAction = ApplicationActionTypes.CreateApplication
  let appCtrlAction = ApplicationActionTypes.CreateAppControl

  if (updating.value) {
    appAction = ApplicationActionTypes.UpdateApplication
    if (selectedApp.value.Ctrl) {
      appCtrlAction = ApplicationActionTypes.UpdateAppControl
    }
  }

  creating.value = false
  updating.value = false
  modifying.value = false

  store.dispatch(appAction, {
    Info: app.App,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_APPLICATION_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(appCtrlAction, {
    TargetAppID: app.App.ID,
    Info: app.Ctrl,
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_CREATE_APPLICATION_CONTROL_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
}

const unsubscribe = ref<FunctionVoid>()

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleApplications,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === ApplicationMutationTypes.SetApplications) {
      loading.value = false
    }

    if (mutation.type === ApplicationMutationTypes.SetApplication) {
      loading.value = true
      store.dispatch(ApplicationActionTypes.GetApplications, {
        Message: {
          ModuleKey: ModuleKey.ModuleApplications,
          Error: {
            Title: t('MSG_GET_APPLICATIONS_FAIL'),
            Popup: true,
            Type: NotificationType.Error
          }
        }
      })
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

const onCreateApplication = () => {
  modifying.value = true
  creating.value = true
}

const onRowClick = (app: App) => {
  applications.value.forEach((application) => {
    if (application.App.ID === app.ID) {
      selectedApp.value = application
    }
  })
  modifying.value = true
  updating.value = true
}

const onMenuHide = () => {
  creating.value = false
  updating.value = false
  modifying.value = false
}

</script>
