<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ProductResource\Pages;
use App\Filament\Resources\ProductResource\RelationManagers\ImagesRelationManager;
use App\Models\Category;
use App\Models\Product;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class ProductResource extends Resource
{
    protected static ?string $model = Product::class;
    protected static ?string $title = 'المنتجات';
    protected static ?string $label = 'منتج';
    protected static ?string $pluralLabel = 'المنتجات';
    protected static ?string $slug = 'products';
    protected static ?string $navigationLabel = 'المنتجات';
    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Select::make('category_id')
                    ->relationship('category', 'name')
                    ->label('الشركة')
                    ->required(),
                Forms\Components\TextInput::make('title')
                    ->label('العنوان')
                    ->required()
                    ->maxLength(255),
                Forms\Components\RichEditor::make('description')
                    ->label('الوصف')
                    ->required(),
                Forms\Components\Select::make('status')
                    ->label('الحالة')
                    ->options([
                        'active' => 'متوفر',
                        'inactive' => 'غير متوفر'
                    ])
                    ->required(),
                Forms\Components\TextInput::make('price')
                    ->label('السعر')
                    ->required()
                    ->inputMode('decimal')
                    ->prefix('$')
                    ->rule('regex:/^0$|^[1-9]\d*(,\d{1,2})?$|^0(,\d{1,2})?$/')
                    ->helperText('يسمح فقط بالأرقام والفاصلة (مثال: 1234,56)')
                    ->dehydrateStateUsing(fn ($state) => str_replace(',', '.', $state)),
                Forms\Components\TextInput::make('stock')
                    ->label('المخزون')
                    ->numeric()
                    ->minValue(0)
                    ->nullable(),
                Forms\Components\FileUpload::make('images')
                    ->label('الصور')
                    ->directory('products')
                    ->disk('public')
                    ->multiple()
                    ->image()
                    ->maxSize(2048)
                    ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/gif'])
                    ->required()
                    ->saveRelationshipsUsing(function ($component, $state, $record) {
                        // Delete old images if updating
                        if ($record) {
                            foreach ($record->images as $image) {
                                \Illuminate\Support\Facades\Storage::disk('public')->delete($image->path);
                                $image->delete();
                            }
                        }
                        // Save new images
                        foreach ($state as $index => $filePath) {
                            $record->images()->create([
                                'path' => $filePath,
                                'sort' => $index,
                            ]);
                        }
                    })
                    ->visibleOn(['create', 'edit']),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('category.name')
                    ->label('الشركة')
                    ->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->label('العنوان')
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->label('الوصف')
                    ->searchable()
                    ->limit(50),
                Tables\Columns\TextColumn::make('status')
                    ->label('الحالة')
                    ->formatStateUsing(fn ($state) => $state === 'active' ? 'متوفر' : 'غير متوفر'),
                Tables\Columns\TextColumn::make('price')
                    ->label('السعر')
                    ->money('USD')
                    ->sortable(),
                Tables\Columns\TextColumn::make('stock')
                    ->label('المخزون')
                    ->sortable()
                    ->default('غير محدد'),
                Tables\Columns\ImageColumn::make('images.path')
                    ->label('الصور')
                    ->getStateUsing(fn ($record) => $record->images->first() ? asset('storage/' . $record->images->first()->path) : null)
                    ->circular()
                    ->defaultImageUrl(url('/images/placeholder.png'))
                    ->toggleable(),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('تاريخ الإنشاء')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('تاريخ التحديث')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category_id')
                    ->options(fn () => Category::pluck('name', 'id')->toArray())
                    ->label('الشركة'),
                Tables\Filters\SelectFilter::make('status')
                    ->label('الحالة')
                    ->options([
                        'active' => 'متوفر',
                        'inactive' => 'غير متوفر'
                    ]),
            ])
            ->actions([
                Tables\Actions\ViewAction::make()
                    ->label('عرض')
                    ->icon('heroicon-o-eye'),
                Tables\Actions\EditAction::make()
                    ->label('تعديل')
                    ->icon('heroicon-o-pencil'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make()
                        ->label('حذف')
                        ->icon('heroicon-o-trash'),
                ])
                    ->label('إجراءات جماعية')
                    ->icon('heroicon-o-ellipsis-horizontal'),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            ImagesRelationManager::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListProducts::route('/'),
            'create' => Pages\CreateProduct::route('/create'),
            'view' => Pages\ViewProduct::route('/{record}'),
            'edit' => Pages\EditProduct::route('/{record}/edit'),
        ];
    }
}