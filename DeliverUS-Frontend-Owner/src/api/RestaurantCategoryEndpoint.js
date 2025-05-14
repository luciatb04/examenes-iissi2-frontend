import { post } from './helpers/ApiRequestsHelper'
function createCategory (data) {
  return post('restaurantCategories', data)
}

export { createCategory }
