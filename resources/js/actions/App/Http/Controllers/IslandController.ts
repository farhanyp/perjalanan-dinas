import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\IslandController::index
 * @see app/Http/Controllers/IslandController.php:12
 * @route '/islands'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/islands',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\IslandController::index
 * @see app/Http/Controllers/IslandController.php:12
 * @route '/islands'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IslandController::index
 * @see app/Http/Controllers/IslandController.php:12
 * @route '/islands'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\IslandController::index
 * @see app/Http/Controllers/IslandController.php:12
 * @route '/islands'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\IslandController::index
 * @see app/Http/Controllers/IslandController.php:12
 * @route '/islands'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\IslandController::index
 * @see app/Http/Controllers/IslandController.php:12
 * @route '/islands'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\IslandController::index
 * @see app/Http/Controllers/IslandController.php:12
 * @route '/islands'
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
* @see \App\Http\Controllers\IslandController::store
 * @see app/Http/Controllers/IslandController.php:19
 * @route '/islands'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/islands',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\IslandController::store
 * @see app/Http/Controllers/IslandController.php:19
 * @route '/islands'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\IslandController::store
 * @see app/Http/Controllers/IslandController.php:19
 * @route '/islands'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\IslandController::store
 * @see app/Http/Controllers/IslandController.php:19
 * @route '/islands'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IslandController::store
 * @see app/Http/Controllers/IslandController.php:19
 * @route '/islands'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\IslandController::update
 * @see app/Http/Controllers/IslandController.php:33
 * @route '/islands/{island}'
 */
export const update = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put"],
    url: '/islands/{island}',
} satisfies RouteDefinition<["put"]>

/**
* @see \App\Http\Controllers\IslandController::update
 * @see app/Http/Controllers/IslandController.php:33
 * @route '/islands/{island}'
 */
update.url = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { island: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { island: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    island: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        island: typeof args.island === 'object'
                ? args.island.id
                : args.island,
                }

    return update.definition.url
            .replace('{island}', parsedArgs.island.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IslandController::update
 * @see app/Http/Controllers/IslandController.php:33
 * @route '/islands/{island}'
 */
update.put = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\IslandController::update
 * @see app/Http/Controllers/IslandController.php:33
 * @route '/islands/{island}'
 */
    const updateForm = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IslandController::update
 * @see app/Http/Controllers/IslandController.php:33
 * @route '/islands/{island}'
 */
        updateForm.put = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\IslandController::destroy
 * @see app/Http/Controllers/IslandController.php:47
 * @route '/islands/{island}'
 */
export const destroy = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/islands/{island}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\IslandController::destroy
 * @see app/Http/Controllers/IslandController.php:47
 * @route '/islands/{island}'
 */
destroy.url = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { island: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { island: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    island: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        island: typeof args.island === 'object'
                ? args.island.id
                : args.island,
                }

    return destroy.definition.url
            .replace('{island}', parsedArgs.island.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\IslandController::destroy
 * @see app/Http/Controllers/IslandController.php:47
 * @route '/islands/{island}'
 */
destroy.delete = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\IslandController::destroy
 * @see app/Http/Controllers/IslandController.php:47
 * @route '/islands/{island}'
 */
    const destroyForm = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\IslandController::destroy
 * @see app/Http/Controllers/IslandController.php:47
 * @route '/islands/{island}'
 */
        destroyForm.delete = (args: { island: number | { id: number } } | [island: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const IslandController = { index, store, update, destroy }

export default IslandController