import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
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
import { Plus, Edit, Trash2, Map, Landmark } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import provincesRoutes from '@/routes/provinces';

interface Island {
    id: number;
    name: string;
}

interface Province {
    id: number;
    island_id: number;
    name: string;
    latitude: string | null;
    longitude: string | null;
    is_abroad: boolean;
    island?: Island;
}

interface Props {
    provinces: Province[];
    islands: Island[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Provinces',
        href: '/provinces',
    },
];

export default function ProvinceIndex({ provinces, islands }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState<Province | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        island_id: '',
        name: '',
        latitude: '',
        longitude: '',
        is_abroad: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && selectedProvince) {
            put(provincesRoutes.update.url({ id: selectedProvince.id }), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setIsEditing(false);
                },
            });
        } else {
            post(provincesRoutes.store.url(), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (province: Province) => {
        setSelectedProvince(province);
        setData({
            island_id: province.island_id.toString(),
            name: province.name,
            latitude: province.latitude || '',
            longitude: province.longitude || '',
            is_abroad: province.is_abroad,
        });
        setIsEditing(true);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this province?')) {
            destroy(provincesRoutes.destroy.url({ id }));
        }
    };

    const openCreateModal = () => {
        reset();
        setIsEditing(false);
        setIsOpen(true);
    };

    return (
        <>
            <Head title="Provinces" />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                            <Landmark className="w-6 h-6 text-primary" />
                            Provinces
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            A list of all provinces associated with islands in the system.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Button onClick={openCreateModal} className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Province
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
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Island</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Coordinates</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Status</th>
                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border bg-card">
                                        {provinces.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="py-10 text-center text-sm text-muted-foreground">
                                                    No provinces found. Click "Add Province" to create one.
                                                </td>
                                            </tr>
                                        ) : (
                                            provinces.map((province) => (
                                                <tr key={province.id} className="hover:bg-muted/30 transition-colors">
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6">
                                                        {province.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                                                        {province.island?.name || 'N/A'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                                                        {province.latitude && province.longitude
                                                            ? `${province.latitude}, ${province.longitude}`
                                                            : 'Not set'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${province.is_abroad ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                            {province.is_abroad ? 'Abroad' : 'Domestic'}
                                                        </span>
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(province)}>
                                                                <Edit className="w-4 h-4 text-blue-500" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(province.id)}>
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
                        <DialogTitle>{isEditing ? 'Edit Province' : 'Add New Province'}</DialogTitle>
                        <DialogDescription>
                            Enter the details for the province.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="island_id">Island</Label>
                            <Select
                                value={data.island_id}
                                onValueChange={(value) => setData('island_id', value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an island" />
                                </SelectTrigger>
                                <SelectContent>
                                    {islands.map((island) => (
                                        <SelectItem key={island.id} value={island.id.toString()}>
                                            {island.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.island_id && <p className="text-xs text-destructive">{errors.island_id}</p>}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                placeholder="Province Name"
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
                                id="is_abroad_p"
                                checked={data.is_abroad}
                                onCheckedChange={(checked) => setData('is_abroad', !!checked)}
                            />
                            <Label htmlFor="is_abroad_p" className="text-sm font-medium leading-none">
                                Is this province abroad?
                            </Label>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {isEditing ? 'Update Province' : 'Create Province'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
