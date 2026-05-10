import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';
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
import { useState } from 'react';
import { Plus, Edit, Trash2, FileText, Calendar, MapPin, User as UserIcon, CheckCircle2, Clock, XCircle, Archive, FileEdit } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import documentsRoutes from '@/routes/documents';
import { Island, Province, City, User, Document, BreadcrumbItem, StatusConfig } from '@/types';
import { calculateDistance, formatIDR } from '@/lib/utils';

interface Props {
    documents: Document[];
    cities: City[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Documents',
        href: '/documents',
    },
];

const statusConfig: StatusConfig = {
    DRAFT: { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: FileEdit },
    PROCESSING: { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock },
    APPROVE: { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
    DECLINE: { color: 'bg-rose-100 text-rose-700 border-rose-200', icon: XCircle },
    ARCHIVED: { color: 'bg-purple-100 text-purple-700 border-purple-200', icon: Archive },
};

export default function DocumentIndex({ documents, cities }: Props) {
    const [isEditing, setIsEditing] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [showSummary, setShowSummary] = useState(false);
    const [allowanceDetail, setAllowanceDetail] = useState<any>(null);
    const [isFetchingRate, setIsFetchingRate] = useState(false);

    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        city_id: '',
        title: '',
        description: '',
        status: 'DRAFT' as Document['status'],
        start_date: '',
        end_date: '',
        message_decline: '',
    });


    const handlePreSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const destCity = cities.find(c => c.id.toString() === data.city_id);
        if (!destCity) return;

        // Calculate duration
        const start = new Date(data.start_date);
        const end = new Date(data.end_date);
        const diffTime = Math.abs(end.getTime() - start.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        let dailyAllowance = 0;
        let currency = 'IDR';
        let isAbroad = destCity.is_abroad;
        let distance = 0;

        // Assume Home Base is City ID 1 (Jakarta)
        const homeCity = cities.find(c => c.id === 1) || cities[0];

        if (isAbroad) {
            dailyAllowance = 50;
            currency = 'USD';
        } else {
            // Distance calculation
            if (homeCity && homeCity.latitude && homeCity.longitude && destCity.latitude && destCity.longitude) {
                distance = calculateDistance(
                    parseFloat(homeCity.latitude), parseFloat(homeCity.longitude),
                    parseFloat(destCity.latitude), parseFloat(destCity.longitude)
                );
            } else {
                // Default if no coordinates: assume > 60km if different city
                distance = homeCity?.id === destCity.id ? 0 : 61;
            }

            if (distance > 60) {
                const homeProvinceId = homeCity?.province_id;
                const destProvinceId = destCity.province_id;
                const homeIslandId = homeCity?.province?.island_id;
                const destIslandId = destCity.province?.island_id;

                if (homeProvinceId === destProvinceId) {
                    dailyAllowance = 200000;
                } else if (homeIslandId === destIslandId) {
                    dailyAllowance = 250000;
                } else {
                    dailyAllowance = 300000;
                }
            } else {
                dailyAllowance = 0;
            }
        }

        let currentRate = 1;

        if (currency === 'USD') {
            setIsFetchingRate(true);
            try {
                const response = await fetch('https://v6.exchangerate-api.com/v6/2acf1a2d9866a9316797d24e/latest/USD');
                const result = await response.json();
                currentRate = result.conversion_rates.IDR;
            } catch (error) {
                console.error("Failed to fetch exchange rate", error);
                currentRate = 15000;
            } finally {
                setIsFetchingRate(false);
            }
        }

        const totalAllowance = dailyAllowance * diffDays;
        const totalAmountIdr = currency === 'USD' ? totalAllowance * currentRate : totalAllowance;

        setAllowanceDetail({
            durationDays: diffDays,
            dailyAllowance,
            totalAllowance,
            currency,
            totalAmountIdr,
            isAbroad,
            distanceKm: distance.toFixed(2),
            cityName: destCity.name,
            exchangeRate: currentRate
        });

        setShowSummary(true);
    };

    const confirmSubmit = () => {
        const options = {
            onSuccess: () => {
                setIsOpen(false);
                setShowSummary(false);
                reset();
                setIsEditing(false);
            },
        };

        const transform = (data: any) => ({ ...data, status: 'PROCESSING' });

        if (isEditing && selectedDocument) {
            put(documentsRoutes.update.url({ id: selectedDocument.id }), {
                ...options,
                // @ts-ignore
                transform
            });
        } else {
            post(documentsRoutes.store.url(), {
                ...options,
                // @ts-ignore
                transform
            });
        }
    };

    const handleEdit = (doc: Document) => {
        setSelectedDocument(doc);
        setData({
            city_id: doc.city_id.toString(),
            title: doc.title,
            description: doc.description || '',
            status: doc.status,
            start_date: doc.start_date,
            end_date: doc.end_date,
            message_decline: doc.message_decline || '',
        });
        setIsEditing(true);
        setIsOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this document?')) {
            destroy(documentsRoutes.destroy.url({ id }));
        }
    };

    const openCreateModal = () => {
        reset();
        setIsEditing(false);
        setIsOpen(true);
    };

    return (
        <>
            <Head title="Documents" />

            <div className="p-4 sm:p-6 lg:p-8">
                <div className="sm:flex sm:items-center">
                    <div className="sm:flex-auto">
                        <h1 className="text-2xl font-semibold text-foreground flex items-center gap-2">
                            <FileText className="w-6 h-6 text-primary" />
                            Documents
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Manage all travel documents and their approval status.
                        </p>
                    </div>
                    <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                        <Button onClick={openCreateModal} className="flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            New Document
                        </Button>
                    </div>
                </div>

                <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {documents.length === 0 ? (
                        <div className="col-span-full py-20 text-center border-2 border-dashed rounded-xl bg-muted/20">
                            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                            <p className="text-muted-foreground">No documents found. Start by creating a new one.</p>
                        </div>
                    ) : (
                        documents.map((doc) => {
                            const StatusIcon = statusConfig[doc.status].icon;
                            return (
                                <div key={doc.id} className="group relative bg-card rounded-xl border shadow-sm hover:shadow-md transition-all p-5 flex flex-col space-y-4">
                                    <div className="flex justify-between items-start">
                                        <Badge className={`${statusConfig[doc.status].color} border shadow-none flex items-center gap-1 py-1`}>
                                            <StatusIcon className="w-3 h-3" />
                                            {doc.status}
                                        </Badge>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(doc)}>
                                                <Edit className="w-4 h-4 text-blue-500" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDelete(doc.id)}>
                                                <Trash2 className="w-4 h-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="font-bold text-lg leading-tight text-foreground line-clamp-1">{doc.title}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{doc.description || 'No description provided.'}</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <MapPin className="w-3 h-3" />
                                            <span className="truncate">{doc.city?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <UserIcon className="w-3 h-3" />
                                            <span className="truncate">{doc.creator?.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground col-span-2">
                                            <Calendar className="w-3 h-3" />
                                            <span>{doc.start_date} - {doc.end_date}</span>
                                        </div>
                                    </div>

                                    {doc.status === 'DECLINE' && doc.message_decline && (
                                        <div className="mt-2 p-2 rounded bg-rose-50 border border-rose-100 text-xs text-rose-700">
                                            <strong>Reason:</strong> {doc.message_decline}
                                        </div>
                                    )}
                                </div>
                            );
                        })
                    )}
                </div>
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>{isEditing ? 'Edit Document' : 'Create New Document'}</DialogTitle>
                        <DialogDescription>
                            Fill in the details for the travel document.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handlePreSubmit} className="space-y-6 pt-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="title">Trip Purpose</Label>
                                <Input
                                    id="title"
                                    value={data.title}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('title', e.target.value)}
                                    placeholder="e.g., Perjalanan Dinas ke Jakarta"
                                    required
                                />
                                {errors.title && <p className="text-xs text-destructive">{errors.title}</p>}
                            </div>

                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="city_id">Destination City</Label>
                                <Select
                                    value={data.city_id}
                                    onValueChange={(value) => setData('city_id', value)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select destination" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {cities.map((city) => (
                                            <SelectItem key={city.id} value={city.id.toString()}>
                                                {city.name} {city.is_abroad ? '(Luar Negeri)' : ''}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.city_id && <p className="text-xs text-destructive">{errors.city_id}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="start_date">Departure Date (DD-MM-YYYY)</Label>
                                <Input
                                    id="start_date"
                                    type="date"
                                    value={data.start_date}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('start_date', e.target.value)}
                                    required
                                />
                                {errors.start_date && <p className="text-xs text-destructive">{errors.start_date}</p>}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="end_date">Return Date (DD-MM-YYYY)</Label>
                                <Input
                                    id="end_date"
                                    type="date"
                                    value={data.end_date}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('end_date', e.target.value)}
                                    required
                                />
                                {errors.end_date && <p className="text-xs text-destructive">{errors.end_date}</p>}
                            </div>

                            <div className="space-y-2 col-span-2">
                                <Label htmlFor="description">Additional Description</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('description', e.target.value)}
                                    placeholder="Brief explanation of the trip..."
                                    className="min-h-[100px]"
                                />
                            </div>
                        </div>

                        <DialogFooter className="gap-2 sm:gap-0">
                            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing || isFetchingRate} className="min-w-[120px]">
                                {isFetchingRate ? 'Fetching Rate...' : (isEditing ? 'Update & Preview' : 'Ajukan')}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog open={showSummary} onOpenChange={setShowSummary}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Rangkuman Perjalanan Dinas</DialogTitle>
                        <DialogDescription>
                            Berikut adalah rincian pengajuan perjalanan dinas Anda.
                        </DialogDescription>
                    </DialogHeader>
                    
                    {allowanceDetail && (
                        <div className="space-y-4 py-4">
                            <div className="bg-muted/50 p-4 rounded-lg space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Kota Tujuan:</span>
                                    <span className="font-medium">{allowanceDetail.cityName}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Durasi:</span>
                                    <span className="font-medium">{allowanceDetail.durationDays} Hari</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Jarak Estimasi:</span>
                                    <span className="font-medium">{allowanceDetail.distanceKm} km</span>
                                </div>
                                <hr className="border-muted" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-muted-foreground">Uang Saku Per Hari:</span>
                                    <span className="font-semibold text-sm">
                                        {allowanceDetail.currency} {allowanceDetail.dailyAllowance.toLocaleString()}
                                    </span>
                                </div>
                                <hr className="border-muted/50" />
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-bold">Total Uang Saku:</span>
                                    <div className="text-right">
                                        <div className="font-bold text-primary text-xl">
                                            {allowanceDetail.currency} {allowanceDetail.totalAllowance.toLocaleString()}
                                        </div>
                                        {allowanceDetail.currency === 'USD' && (
                                            <div className="text-xs text-muted-foreground font-medium">
                                                ≈ {formatIDR(allowanceDetail.totalAmountIdr)}
                                                <div className="text-[10px] opacity-70">
                                                    (Rate: {allowanceDetail.exchangeRate.toLocaleString('id-ID', { maximumFractionDigits: 2 })})
                                                </div>
                                            </div>
                                        )}
                                        {allowanceDetail.currency === 'IDR' && allowanceDetail.durationDays > 1 && (
                                            <div className="text-[10px] text-muted-foreground">
                                                ({allowanceDetail.dailyAllowance.toLocaleString()} x {allowanceDetail.durationDays} hari)
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            
                            <p className="text-xs text-muted-foreground text-center italic bg-blue-50/50 py-2 rounded">
                                * Status dokumen akan otomatis menjadi <span className="text-blue-600 font-bold">PROCESSING</span> setelah konfirmasi.
                            </p>
                        </div>
                    )}

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowSummary(false)}>
                            Revisi
                        </Button>
                        <Button onClick={confirmSubmit} disabled={processing}>
                            Konfirmasi & Ajukan
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
