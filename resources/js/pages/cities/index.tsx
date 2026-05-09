import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import citiesRoutes from '@/routes/cities';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Plus, Edit, Trash2, Building2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface Province {
    id: number;
    name: string;
    island?: { name: string };
}

interface City {
    id: number;
    province_id: number;
    name: string;
    latitude: string | null;
    longitude: string | null;
    is_abroad: boolean;
    province?: Province;
}

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
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        province_id: '',
        name: '',
        latitude: '',
        longitude: '',
        is_abroad: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && selectedCity) {
            put(citiesRoutes.update.url({ id: selectedCity.id }), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setIsEditing(false);
                },
            });
        } else {
            post(citiesRoutes.store.url(), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (city: City) => {
        setSelectedCity(city);
        setData({
            province_id: city.province_id.toString(),
            name: city.name,
            latitude: city.latitude || '',
            longitude: city.longitude || '',
            is_abroad: city.is_abroad,
        });
        setIsEditing(true);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this city?')) {
            destroy(citiesRoutes.destroy.url({ id }));
        }
    };

    const openCreateModal = () => {
        reset();
        setIsEditing(false);
        setIsOpen(true);
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
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
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

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit City' : 'Add New City'}</DialogTitle>
                        <DialogDescription>
                            Enter the details for the city.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="province_id">Province</Label>
                            <Select
                                value={data.province_id}
                                onValueChange={(value) => setData('province_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a province" />
                                </SelectTrigger>
                                <SelectContent>
                                    {provinces.map((province) => (
                                        <SelectItem key={province.id} value={province.id.toString()}>
                                            {province.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.province_id && <p className="text-xs text-destructive">{errors.province_id}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                placeholder="City Name"
                                required
                            />
                            {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="latitude">Latitude</Label>
                                <Input
                                    id="latitude"
                                    value={data.latitude}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('latitude', e.target.value)}
                                    placeholder="-6.1751"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="longitude">Longitude</Label>
                                <Input
                                    id="longitude"
                                    value={data.longitude}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('longitude', e.target.value)}
                                    placeholder="106.8272"
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="is_abroad_c"
                                checked={data.is_abroad}
                                onCheckedChange={(checked) => setData('is_abroad', !!checked)}
                            />
                            <Label htmlFor="is_abroad_c" className="text-sm font-medium leading-none">
                                Is this city abroad?
                            </Label>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {isEditing ? 'Update City' : 'Create City'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
