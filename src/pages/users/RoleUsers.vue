<template>
  <div class='row'>
    <q-table
      v-model:selected='selectedRole'
      row-key='ID'
      flat
      dense
      :loading='loading'
      :rows='roleNames'
      selection='single'
    >
      <template #top-right>
        <div class='row'>
          <q-space />
          <ApplicationSelector v-model:selected-app-id='selectedAppID' />
        </div>
      </template>
    </q-table>
    <div>
      <q-table
        v-model:selected='selectedRoleUsers'
        row-key='RoleUserID'
        selection='multiple'
        flat
        dense
        :title='selectedRoleName + t("MSG_USER_SURFIX")'
        :rows='myRoleUsers'
      >
        <template #top-right>
          <div class='row'>
            <q-space />
            <q-btn dense @click='onDeleteUsersFromRole'>
              {{ $t('MSG_DELETE') }}
            </q-btn>
          </div>
        </template>
      </q-table>
      <q-table
        v-model:selected='selectedUsers'
        row-key='ID'
        dense
        flat
        selection='multiple'
        :title='t("MSG_APP_USER")'
        :rows='myAppUsers'
      >
        <template #top-right>
          <div class='row'>
            <q-space />
            <q-btn dense @click='onAddUsersToRole'>
              {{ $t('MSG_ADD') }}
            </q-btn>
          </div>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, computed, ref, defineAsyncComponent, watch, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStore } from 'src/store'
import { ModuleKey, Type as NotificationType } from 'src/store/notifications/const'
import { FunctionVoid } from 'src/types/types'
import { MutationTypes as UserMutationTypes } from 'src/store/user-helper/mutation-types'
import { ActionTypes as UserActionTypes } from 'src/store/user-helper/action-types'
import { ActionTypes as ApplicationActionTypes } from 'src/store/applications/action-types'
import { AppUser } from 'src/store/user-helper/types'

const ApplicationSelector = defineAsyncComponent(() => import('src/components/dropdown/ApplicationSelector.vue'))

const store = useStore()
// eslint-disable-next-line @typescript-eslint/unbound-method
const { t } = useI18n({ useScope: 'global' })

const selectedAppID = computed({
  get: () => store.getters.getUserSelectedAppID,
  set: (val) => {
    store.commit(UserMutationTypes.SetSelectedAppID, val)
  }
})

interface roleName {
  ID: string
  Role: string
}

const selectedRole = ref([] as Array<roleName>)
const selectedRoleName = computed(() => {
  return selectedRole.value.length > 0 ? selectedRole.value[0].Role : ''
})
const selectedRoleID = computed(() => {
  return selectedRole.value.length > 0 ? selectedRole.value[0].ID : ''
})
const selectedUsers = ref([])

const roleusers = computed(() => store.getters.getAppRoleUsersByAppRoleID(selectedAppID.value, selectedRoleID.value))

interface appUserWithRole extends AppUser {
  RoleUserID: string
}

const myRoleUsers = computed(() => {
  const users = [] as Array<appUserWithRole>
  if (roleusers.value) {
    roleusers.value.forEach((roleuser) => {
      const user = store.getters.getUserByAppUserID(roleuser.AppID, roleuser.UserID)
      if (user) {
        users.push({
          ID: user.User?.ID,
          RoleUserID: roleuser.ID as string,
          EmailAddress: user.User?.EmailAddress,
          PhoneNO: user.User?.PhoneNO,
          AppID: user.User?.AppID as string
        })
      }
    })
  }
  return users
})

const selectedRoleUsers = ref([])

const appUsers = computed(() => store.getters.getAppUserInfosByAppID(selectedAppID.value))

interface userWithRoles extends AppUser {
  RoleNames: string
}
const myAppUsers = computed(() => {
  const users = [] as Array<userWithRoles>
  if (appUsers.value) {
    appUsers.value.forEach((user) => {
      for (let i = 0; i < myRoleUsers.value.length; i++) {
        if (user.User?.ID === myRoleUsers.value[i].ID) {
          return
        }
      }

      const roleNames = [] as Array<string>
      user.Roles?.forEach((role) => {
        roleNames.push(role.Role)
      })

      users.push({
        ID: user.User?.ID,
        AppID: user.User?.AppID as string,
        EmailAddress: user.User?.EmailAddress,
        PhoneNO: user.User?.PhoneNO,
        RoleNames: roleNames.join(',')
      })
    })
  }
  return users
})

const loading = ref(false)
const roles = computed(() => store.getters.getAppRolesByAppID(selectedAppID.value))

const roleNames = computed(() => {
  const names = [] as Array<roleName>
  if (roles.value) {
    roles.value.forEach((role) => {
      names.push({
        ID: role.ID,
        Role: role.Role
      })
    })
  }
  return names
})

const unsubscribe = ref<FunctionVoid>()

watch(selectedAppID, () => {
  loading.value = true
  store.dispatch(UserActionTypes.GetAppUserInfosByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_USER_INFOS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(UserActionTypes.GetAppRoleUsersByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_ROLES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(ApplicationActionTypes.GetAppRolesByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_ROLES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })
})

const onAddUsersToRole = () => {
  selectedUsers.value.forEach((user: AppUser) => {
    store.dispatch(UserActionTypes.CreateAppRoleUserForOtherAppUser, {
      TargetAppID: selectedAppID.value,
      TargetUserID: user.ID as string,
      Info: {
        AppID: selectedAppID.value,
        UserID: user.ID as string,
        RoleID: selectedRoleID.value
      },
      Message: {
        ModuleKey: ModuleKey.ModuleUsers,
        Error: {
          Title: t('MSG_CREATE_APP_ROLE_USER_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

const onDeleteUsersFromRole = () => {
  selectedRoleUsers.value.forEach((user: appUserWithRole) => {
    store.dispatch(UserActionTypes.DeleteAppRoleUser, {
      ID: user.RoleUserID,
      Message: {
        ModuleKey: ModuleKey.ModuleUsers,
        Error: {
          Title: t('MSG_DELETE_APP_ROLE_USER_FAIL'),
          Popup: true,
          Type: NotificationType.Error
        }
      }
    })
  })
}

onMounted(() => {
  store.dispatch(ApplicationActionTypes.GetApplications, {
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APPLICATIONS_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  store.dispatch(UserActionTypes.GetAppRoleUsersByOtherApp, {
    TargetAppID: selectedAppID.value,
    Message: {
      ModuleKey: ModuleKey.ModuleUsers,
      Error: {
        Title: t('MSG_GET_APP_ROLES_FAIL'),
        Popup: true,
        Type: NotificationType.Error
      }
    }
  })

  unsubscribe.value = store.subscribe((mutation) => {
    if (mutation.type === UserMutationTypes.SetAppRoleUsers) {
      loading.value = false
    }
  })
})

onUnmounted(() => {
  unsubscribe.value?.()
})

</script>
