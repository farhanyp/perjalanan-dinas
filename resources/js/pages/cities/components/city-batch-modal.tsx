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
import { useForm } from '@inertiajs/react';
import { Download, Upload, FileJson } from 'lucide-react';
import citiesRoutes from '@/routes/cities';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export function CityBatchModal({ isOpen, onClose }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        file: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(citiesRoutes.importBatch.url(), {
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    const handleDownloadTemplate = () => {
        window.location.href = citiesRoutes.downloadTemplate.url();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Upload className="w-5 h-5 text-primary" />
                        Batch Upload Cities
                    </DialogTitle>
                    <DialogDescription>
                        Upload an Excel (.xlsx) file to import multiple cities at once. The process will run in the background.
                    </DialogDescription>
                </DialogHeader>
                
                <div className="bg-muted/50 p-4 rounded-lg border border-dashed border-muted-foreground/20 mb-4">
                    <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        1. Download Template
                    </h4>
                    <p className="text-xs text-muted-foreground mb-3">
                        Use our template to ensure your data is formatted correctly.
                    </p>
                    <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={handleDownloadTemplate}
                        className="w-full"
                    >
                        Download Excel Template
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <h4 className="text-sm font-semibold flex items-center gap-2">
                            <FileJson className="w-4 h-4" />
                            2. Upload File
                        </h4>
                        <Label htmlFor="file" className="sr-only">Choose Excel File</Label>
                        <div className="flex items-center gap-2">
                            <Input
                                id="file"
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.files) setData('file', e.target.files[0]);
                                }}
                                required
                            />
                        </div>
                        {errors.file && <p className="text-xs text-destructive">{errors.file}</p>}
                    </div>

                    <div className="text-[10px] text-muted-foreground bg-amber-50 border border-amber-100 p-2 rounded">
                        <strong>Note:</strong> Country 'Indonesia' will set <em>is_abroad</em> to true.
                    </div>

                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Uploading...' : 'Process Batch'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
