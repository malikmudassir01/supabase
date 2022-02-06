import { useQuasar } from 'quasar'
export default function useNotify() {
  const $q = useQuasar()

  const notifySuccess = (message) => {
    $q.notify({
      type: 'positive',
      message: message || 'All right !'
    })
  }

  const notifyError = (message) => {
    $q.notify({
      type: 'negative',
      message: message || 'Failed !'
    })
  }

  const showLoader = () => {
    $q.loading.show({
      backgroundColor: 'dark'
    })
  }

  const hideLoader = () => {
    $q.loading.hide()

  }
  return {
    notifySuccess,
    notifyError,
    showLoader,
    hideLoader
  }
}
