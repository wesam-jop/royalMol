<?php

namespace App\Filament\Resources\ProductResource\RelationManagers;

use App\Models\ProductImage;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Facades\Storage;

class ImagesRelationManager extends RelationManager
{
    protected static string $relationship = 'images';

    protected function handleRecordCreation(array $data): mixed
    {
        // Handle multiple file uploads
        if (is_array($data['path'])) {
            $records = [];

            foreach ($data['path'] as $path) {
                $records[] = $this->getRelationship()->create([
                    'path' => $path,
                ]);
            }

            return $records[0] ?? null; // Return the first record or null
        }

        // Regular single file handling (fallback)
        return $this->getRelationship()->create($data);
    }

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\FileUpload::make('path')
                    ->label('الصورة')
                    ->directory('products')
                    ->disk('public')
                    ->multiple()
                    ->required(),
            ]);
    }

    public function isReadOnly(): bool
    {
        return false;
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('path')
            ->columns([
                Tables\Columns\ImageColumn::make('path')
                    ->label('الصورة')
                    ->disk('public'),
            ])
            ->filters([
                //
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->label('إضافة صورة')
                    ->icon('heroicon-o-plus')
                    ->using(function (array $data, RelationManager $livewire): mixed {
                        return $livewire->handleRecordCreation($data);
                    }),
            ])
            ->actions([
                Tables\Actions\Action::make('view_image')
                    ->label("عرض الصورة")
                    ->icon('heroicon-o-eye')
                    ->color('primary')
                    ->modalHeading('عرض الصورة')
                    ->modalDescription(fn(ProductImage $record) => 'عرض الصورة')
                    ->modalContent(function (ProductImage $record) {
                        $imageUrl = $record->path;
                        return view('components.view-image', ['imageUrl' => $imageUrl]);
                    })
                    ->modalCancelAction(false)
                    ->modalSubmitAction(false),
                Tables\Actions\DeleteAction::make()
                    ->label('حذف')
                    ->icon('heroicon-o-trash')
                    ->before(function (ProductImage $record) {
                        // Delete the image file from storage before deleting the record
                        if ($record->path && Storage::disk('public')->exists($record->path)) {
                            Storage::disk('public')->delete($record->path);
                        }
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label('حذف')
                        ->icon('heroicon-o-trash')
                        ->requiresConfirmation()
                        ->color('danger')
                        ->before(function (Tables\Actions\DeleteBulkAction $action) {
                            // Delete all image files from storage before deleting the records
                            $action->getRecords()->each(function (ProductImage $record) {
                                if ($record->path && Storage::disk('public')->exists('products/' . $record->path)) {
                                    Storage::disk('public')->delete('products/' . $record->path);
                                }
                            });
                        }),
                ]),
            ]);
    }
}
