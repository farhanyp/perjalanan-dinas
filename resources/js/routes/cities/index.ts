import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \App\Http\Controllers\CityController::downloadTemplate
 * @see app/Http/Controllers/CityController.php:60
 * @route '/cities/download-template'
 */
export const downloadTemplate = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})

downloadTemplate.definition = {
    methods: ["get","head"],
    url: '/cities/download-template',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\CityController::downloadTemplate
 * @see app/Http/Controllers/CityController.php:60
 * @route '/cities/download-template'
 */
downloadTemplate.url = (options?: RouteQueryOptions) => {
    return downloadTemplate.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::downloadTemplate
 * @see app/Http/Controllers/CityController.php:60
 * @route '/cities/download-template'
 */
downloadTemplate.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: downloadTemplate.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::downloadTemplate
 * @see app/Http/Controllers/CityController.php:60
 * @route '/cities/download-template'
 */
downloadTemplate.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: downloadTemplate.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CityController::downloadTemplate
 * @see app/Http/Controllers/CityController.php:60
 * @route '/cities/download-template'
 */
    const downloadTemplateForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: downloadTemplate.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CityController::downloadTemplate
 * @see app/Http/Controllers/CityController.php:60
 * @route '/cities/download-template'
 */
        downloadTemplateForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CityController::downloadTemplate
 * @see app/Http/Controllers/CityController.php:60
 * @route '/cities/download-template'
 */
        downloadTemplateForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: downloadTemplate.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    downloadTemplate.form = downloadTemplateForm
/**
* @see \App\Http\Controllers\CityController::importBatch
 * @see app/Http/Controllers/CityController.php:82
 * @route '/cities/import-batch'
 */
export const importBatch = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importBatch.url(options),
    method: 'post',
})

importBatch.definition = {
    methods: ["post"],
    url: '/cities/import-batch',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\CityController::importBatch
 * @see app/Http/Controllers/CityController.php:82
 * @route '/cities/import-batch'
 */
importBatch.url = (options?: RouteQueryOptions) => {
    return importBatch.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::importBatch
 * @see app/Http/Controllers/CityController.php:82
 * @route '/cities/import-batch'
 */
importBatch.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: importBatch.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CityController::importBatch
 * @see app/Http/Controllers/CityController.php:82
 * @route '/cities/import-batch'
 */
    const importBatchForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: importBatch.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CityController::importBatch
 * @see app/Http/Controllers/CityController.php:82
 * @route '/cities/import-batch'
 */
        importBatchForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: importBatch.url(options),
            method: 'post',
        })
    
    importBatch.form = importBatchForm
/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:15
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
 * @see app/Http/Controllers/CityController.php:15
 * @route '/cities'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:15
 * @route '/cities'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:15
 * @route '/cities'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:15
 * @route '/cities'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:15
 * @route '/cities'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\CityController::index
 * @see app/Http/Controllers/CityController.php:15
 * @route '/cities'
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
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:23
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
 * @see app/Http/Controllers/CityController.php:23
 * @route '/cities'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:23
 * @route '/cities'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:23
 * @route '/cities'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CityController::store
 * @see app/Http/Controllers/CityController.php:23
 * @route '/cities'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\CityController::update
 * @see app/Http/Controllers/CityController.php:38
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
 * @see app/Http/Controllers/CityController.php:38
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
 * @see app/Http/Controllers/CityController.php:38
 * @route '/cities/{city}'
 */
update.put = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

    /**
* @see \App\Http\Controllers\CityController::update
 * @see app/Http/Controllers/CityController.php:38
 * @route '/cities/{city}'
 */
    const updateForm = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CityController::update
 * @see app/Http/Controllers/CityController.php:38
 * @route '/cities/{city}'
 */
        updateForm.put = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\CityController::destroy
 * @see app/Http/Controllers/CityController.php:53
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
 * @see app/Http/Controllers/CityController.php:53
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
 * @see app/Http/Controllers/CityController.php:53
 * @route '/cities/{city}'
 */
destroy.delete = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\CityController::destroy
 * @see app/Http/Controllers/CityController.php:53
 * @route '/cities/{city}'
 */
    const destroyForm = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\CityController::destroy
 * @see app/Http/Controllers/CityController.php:53
 * @route '/cities/{city}'
 */
        destroyForm.delete = (args: { city: number | { id: number } } | [city: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const cities = {
    downloadTemplate: Object.assign(downloadTemplate, downloadTemplate),
importBatch: Object.assign(importBatch, importBatch),
index: Object.assign(index, index),
store: Object.assign(store, store),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default cities