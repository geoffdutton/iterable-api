/**

 POST   - /workflows/triggerWorkflow

 */

const factory = request => {
  const BASE = '/workflows'

  return {
    triggerWorkflow ({ email, workflowId, dataFields, listId }) {
      return request.post(`${BASE}/triggerWorkflow`, {
        email,
        workflowId,
        dataFields,
        listId
      })
    }
  }
}

module.exports = factory
