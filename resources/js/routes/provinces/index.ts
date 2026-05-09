import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\ProvinceController::index
 * @see app/Http/Controllers/ProvinceController.php:13
 * @route '/provinces'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/provinces',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\ProvinceController::index
 * @see app/Http/Controllers/ProvinceController.php:13
 * @route '/provinces'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProvinceController::index
 * @see app/Http/Controllers/ProvinceController.php:13
 * @route '/provinces'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\ProvinceController::index
 * @see app/Http/Controllers/ProvinceController.php:13
 * @route '/provinces'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\ProvinceController::index
 * @see app/Http/Controllers/ProvinceController.php:13
 * @route '/provinces'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\ProvinceController::index
 * @see app/Http/Controllers/ProvinceController.php:13
 * @route '/provinces'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\ProvinceController::index
 * @see app/Http/Controllers/ProvinceController.php:13
 * @route '/provinces'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\ProvinceController::store
 * @see app/Http/Controllers/ProvinceController.php:21
 * @route '/provinces'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/provinces',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\ProvinceController::store
 * @see app/Http/Controllers/ProvinceController.php:21
 * @route '/provinces'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProvinceController::store
 * @see app/Http/Controllers/ProvinceController.php:21
 * @route '/provinces'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\ProvinceController::store
 * @see app/Http/Controllers/ProvinceController.php:21
 * @route '/provinces'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProvinceController::store
 * @see app/Http/Controllers/ProvinceController.php:21
 * @route '/provinces'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\ProvinceController::update
 * @see app/Http/Controllers/ProvinceController.php:36
 * @route '/provinces/{province}'
 */
export const update = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/provinces/{province}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\ProvinceController::update
 * @see app/Http/Controllers/ProvinceController.php:36
 * @route '/provinces/{province}'
 */
update.url = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { province: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { province: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    province: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        province: typeof args.province === 'object'
                ? args.province.id
                : args.province,
                }

    return update.definition.url
            .replace('{province}', parsedArgs.province.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProvinceController::update
 * @see app/Http/Controllers/ProvinceController.php:36
 * @route '/provinces/{province}'
 */
update.put = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\ProvinceController::update
 * @see app/Http/Controllers/ProvinceController.php:36
 * @route '/provinces/{province}'
 */
    const updateForm = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProvinceController::update
 * @see app/Http/Controllers/ProvinceController.php:36
 * @route '/provinces/{province}'
 */
        updateForm.put = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\ProvinceController::destroy
 * @see app/Http/Controllers/ProvinceController.php:51
 * @route '/provinces/{province}'
 */
export const destroy = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/provinces/{province}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\ProvinceController::destroy
 * @see app/Http/Controllers/ProvinceController.php:51
 * @route '/provinces/{province}'
 */
destroy.url = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { province: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { province: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    province: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        province: typeof args.province === 'object'
                ? args.province.id
                : args.province,
                }

    return destroy.definition.url
            .replace('{province}', parsedArgs.province.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\ProvinceController::destroy
 * @see app/Http/Controllers/ProvinceController.php:51
 * @route '/provinces/{province}'
 */
destroy.delete = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\ProvinceController::destroy
 * @see app/Http/Controllers/ProvinceController.php:51
 * @route '/provinces/{province}'
 */
    const destroyForm = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\ProvinceController::destroy
 * @see app/Http/Controllers/ProvinceController.php:51
 * @route '/provinces/{province}'
 */
        destroyForm.delete = (args: { province: number | { id: number } } | [province: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const provinces = {
    index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default provinces