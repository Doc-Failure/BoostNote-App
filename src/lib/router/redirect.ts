import { useDb } from '../db'
import { useRouter } from './store'
import { useEffect } from 'react'
import { usePreferences } from '../preferences'

export default function useRedirectHandler() {
  const db = useDb()
  const { preferences } = usePreferences()
  const { push, pathname } = useRouter()

  useEffect(() => {
    if (
      pathname === '/app' &&
      preferences['general.tutorials'] === 'display' &&
      (db.storageMap == null || Object.keys(db.storageMap).length === 0)
    ) {
      push('/app/tutorials/welcome-pack/guides/notes/note:storage-guide')
    }
    return
  }, [pathname, db.initialized, preferences['general.displayTutorials']])
}
