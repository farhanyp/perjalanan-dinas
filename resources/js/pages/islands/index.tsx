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
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import islandsRoutes from '@/routes/islands';

interface Island {
    id: number;
    name: string;
    latitude: string | null;
    longitude: string | null;
    is_abroad: boolean;
}

interface Props {
    islands: Island[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Islands',
        href: '/islands',
    },
];

export default function IslandIndex({ islands }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedIsland, setSelectedIsland] = useState<Island | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        name: '',
        latitude: '',
        longitude: '',
        is_abroad: false,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && selectedIsland) {
            put(islandsRoutes.update.url({ id: selectedIsland.id }), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                    setIsEditing(false);
                },
            });
        } else {
            post(islandsRoutes.store.url(), {
                onSuccess: () => {
                    setIsOpen(false);
                    reset();
                },
            });
        }
    };

    const handleEdit = (island: Island) => {
        setSelectedIsland(island);
        setData({
            name: island.name,
            latitude: island.latitude || '',
            longitude: island.longitude || '',
            is_abroad: island.is_abroad,
        });
        setIsEditing(true);
        setIsOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this island?')) {
            destroy(islandsRoutes.destroy.url(id));
        }
    };

    const openCreateModal = () => {
        reset();
        setIsEditing(false);
        setIsOpen(true);
    };

    return (
        <>
            <Head title="Islands" />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                            <MapPin className="w-6 h-6 text-primary" />
                            Islands
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            A list of all islands in the system including their geographic coordinates.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Button onClick={openCreateModal} className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Island
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
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Coordinates</th>
                                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Is Abroad</th>
                                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                                <span className="sr-only">Actions</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border bg-card">
                                        {islands.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="py-10 text-center text-sm text-muted-foreground">
                                                    No islands found. Click "Add Island" to create one.
                                                </td>
                                            </tr>
                                        ) : (
                                            islands.map((island) => (
                                                <tr key={island.id} className="hover:bg-muted/30 transition-colors">
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-foreground sm:pl-6">
                                                        {island.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                                                        {island.latitude && island.longitude
                                                            ? `${island.latitude}, ${island.longitude}`
                                                            : 'Not set'}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${island.is_abroad ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                                                            {island.is_abroad ? 'Yes' : 'No'}
                                                        </span>
                                                    </td>
                                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                        <div className="flex justify-end gap-2">
                                                            <Button variant="ghost" size="icon" onClick={() => handleEdit(island)}>
                                                                <Edit className="w-4 h-4 text-blue-500" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" onClick={() => handleDelete(island.id)}>
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
                        <DialogTitle>{isEditing ? 'Edit Island' : 'Add New Island'}</DialogTitle>
                        <DialogDescription>
                            Enter the details for the island. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('name', e.target.value)}
                                placeholder="Island Name"
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
                                {errors.latitude && <p className="text-xs text-destructive">{errors.latitude}</p>}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="longitude">Longitude</Label>
                                <Input
                                    id="longitude"
                                    value={data.longitude}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('longitude', e.target.value)}
                                    placeholder="106.8272"
                                />
                                {errors.longitude && <p className="text-xs text-destructive">{errors.longitude}</p>}
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 pt-2">
                            <Checkbox
                                id="is_abroad"
                                checked={data.is_abroad}
                                onCheckedChange={(checked) => setData('is_abroad', !!checked)}
                            />
                            <Label htmlFor="is_abroad" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                Is this island abroad?
                            </Label>
                        </div>
                        <DialogFooter className="pt-4">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {isEditing ? 'Update Island' : 'Create Island'}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
}
