import { types } from 'mobx-state-tree'
import { callApi } from 'Root/utils/callApi'
import _ from 'lodash'

const ExecutionDataItem = types.model({
  id: types.number,
  start_time: types.string,
  finish_time: types.string,
  program_version: types.number,
})

const ExecutionStore = types
  .model('Store', {
    isFetching: types.boolean,
    error: types.null,
    data: types.optional(types.array(ExecutionDataItem), []),
  })
  .actions(self => ({
    setData(data) {
      self.data = data
    },
    setFetching(fetchState) {
      self.isFetching = fetchState
    },
    setError(error) {
      self.error = error
    },
    fetch() {
      const url = 'http://vzr.dgk.su/business-logic/rest/execution'

      const body = {}

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      }

      callApi({
        url,
        config,
        onRequest: () => self.setFetching(true),
        onSuccess: (json) => self.setData(_.get(json, 'data.results', [])),
        onError: (error) => {
          self.setFetching(false)
          self.setError(error)
        },
      })
    },
  }))

export default ExecutionStore.create({
  isFetching: false,
  error: null,
  data: [],
})
