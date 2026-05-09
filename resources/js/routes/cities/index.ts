import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:13
 * @route '/cities'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/cities',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:13
 * @route '/cities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:13
 * @route '/cities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:13
 * @route '/cities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:21
 * @route '/cities'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/cities',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:21
 * @route '/cities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:21
 * @route '/cities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\CityController::update
 * @see app/Http/Controllers/CityController.php:36
 * @route '/cities/{city}'
 */
export const update = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/cities/{city}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\CityController::update
 * @see app/Http/Controllers/CityController.php:36
 * @route '/cities/{city}'
 */
update.url = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { city: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { city: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    city: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        city: typeof args.city === 'object'
                ? args.city.id
                : args.city,
                }

    return update.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::update
 * @see app/Http/Controllers/CityController.php:36
 * @route '/cities/{city}'
 */
update.put = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

/**
* @see \App\Http\Controllers\CityController::destroy
 * @see app/Http/Controllers/CityController.php:51
 * @route '/cities/{city}'
 */
export const destroy = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/cities/{city}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\CityController::destroy
 * @see app/Http/Controllers/CityController.php:51
 * @route '/cities/{city}'
 */
destroy.url = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { city: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { city: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    city: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        city: typeof args.city === 'object'
                ? args.city.id
                : args.city,
                }

    return destroy.definition.url
            .replace('{city}', parsedArgs.city.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::destroy
 * @see app/Http/Controllers/CityController.php:51
 * @route '/cities/{city}'
 */
destroy.delete = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const cities = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default cities