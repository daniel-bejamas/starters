import React from "react"

import { useAuthContext } from "utils/useAuthContext"

export const RecoveryForm = ({ recoveryToken }) => {
  const { auth } = useAuthContext()

  const [is_loading, set_is_loading] = React.useState()
  const [new_password, set_new_password] = React.useState("")

  const update_new_password = e => set_new_password(e.target.value)

  const onSubmit = e => {
    e.preventDefault()
    set_is_loading(true)

    auth
      .recover(recoveryToken, true)
      .then(() => {
        window.location.href = "/"
      })
      .catch(() => {
        set_is_loading(false)
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        isRequired
        type="password"
        name="password"
        placeholder="new password"
        handleChange={update_new_password}
      />
      <button type="submit" disabled={!new_password} isLoading={is_loading}>
        {is_loading ? "loading..." : "Submit"}
      </button>
    </form>
  )
}
