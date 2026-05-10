import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import citiesRoutes from '@/routes/cities';
import { City, Province } from '@/types';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    city?: City | null;
    provinces: Province[];
}

export function CityModal({ isOpen, onClose, city, provinces }: Props) {
    const isEditing = !!city;

    const { data, setData, post, put, processing, errors, reset } = useForm({
        province_id: '',
        name: '',
        latitude: '',
        longitude: '',
        is_abroad: false,
    });

    useEffect(() => {
        if (city) {
            setData({
                province_id: city.province_id?.toString() || '',
                name: city.name,
                latitude: city.latitude || '',
                longitude: city.longitude || '',
                is_abroad: city.is_abroad,
            });
        } else {
            reset();
        }
    }, [city, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const options = {
            onSuccess: () => {
                reset();
                onClose();
            },
        };

        if (isEditing && city) {
            put(citiesRoutes.update.url({ city: city.id }), options);
        } else {
            post(citiesRoutes.store.url(), options);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{isEditing ? 'Edit City' : 'Add New City'}</DialogTitle>
                    <DialogDescription>
                        {isEditing ? 'Update the details for the selected city.' : 'Enter the details for the new city.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
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
                    <div className="space-y-2">
                        <Label htmlFor="province_id">Province (Optional)</Label>
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
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="latitude">Latitude</Label>
                            <Input
                                id="latitude"
                                value={data.latitude}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('latitude', e.target.value)}
                                placeholder="-6.1751"
                                required
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
                                required
                            />
                            {errors.longitude && <p className="text-xs text-destructive">{errors.longitude}</p>}
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                            id="is_abroad_modal"
                            checked={data.is_abroad}
                            onCheckedChange={(checked) => setData('is_abroad', !!checked)}
                        />
                        <Label htmlFor="is_abroad_modal" className="text-sm font-medium leading-none">
                            Apakah Kota ini berada di luar negri?
                        </Label>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {isEditing ? 'Update City' : 'Create City'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
