import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { City, Province, BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Plus, Edit, Trash2, Building2, Upload } from 'lucide-react';
import citiesRoutes from '@/routes/cities';

// Modular Components
import { CityModal } from './components/city-modal';
import { CityBatchModal } from './components/city-batch-modal';

interface Props {
    cities: City[];
    provinces: Province[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Cities',
        href: '/cities',
    },
];

export default function CityIndex({ cities, provinces }: Props) {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [isSingleModalOpen, setIsSingleModalOpen] = useState(false);
    const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

    const { delete: destroy } = useForm();

    const handleEdit = (city: City) => {
        setSelectedCity(city);
        setIsSingleModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this city?')) {
            destroy(citiesRoutes.destroy.url({ city: id }));
        }
    };

    const openCreateModal = () => {
        setSelectedCity(null);
        setIsSingleModalOpen(true);
    };

    return (
        <>
            <Head title="Cities" />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                            <Building2 className="w-6 h-6 text-primary" />
                            Cities
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            A list of all cities associated with provinces and islands.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setIsBatchModalOpen(true)}
                            className="flex items-center gap-2"
                        >
                            <Upload className="w-4 h-4" />
                            Batch Upload
                        </Button>
                        <Button onClick={openCreateModal} className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add City
                        </Button>
                    </div>
                </div>

                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg border bg-card">
                                <table className="min-w-full divide-y divide-border">
                                    <thead className="bg-muted/50">
                                        <tr>
                                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-6">Name</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Province</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Island</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Status</th>
                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border bg-card">
                                        {cities.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                                                    No cities found. Click "Add City" to create one.
                                                </td>
                                            </tr>
                                        ) : (
                                            cities.map((city) => (
                                                <tr key={city.id} className="hover:bg-muted/30 transition-colors">
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6">
                                                        {city.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                                                        {city.province?.name || 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                                                        {city.province?.island?.name || 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${city.is_abroad ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                            {city.is_abroad ? 'Abroad' : 'Domestic'}
                                                        </span>
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(city)}>
                                                                <Edit className="w-4 h-4 text-blue-500" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(city.id)}>
                                                                <Trash2 className="w-4 h-4 text-destructive" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CityModal
                isOpen={isSingleModalOpen}
                onClose={() => setIsSingleModalOpen(false)}
                city={selectedCity}
                provinces={provinces}
            />

            <CityBatchModal
                isOpen={isBatchModalOpen}
                onClose={() => setIsBatchModalOpen(false)}
            />
        </>
    );
}
