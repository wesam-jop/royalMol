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
                    ->label('الفئة')
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
                    ->dehydrateStateUsing(fn ($state) => str_replace(',', '.', $state)) // الحل هنا


                // Forms\Components\FileUpload::make('path')
                //     ->label('الصورة')
                //     ->directory('products')
                //     ->disk('public')
                //     ->multiple()
                //     ->required()
                //     ->saveRelationshipsUsing(function ($component, $state, $record) {
                //         foreach ($state as $filePath) {
                //             $record->images()->create([
                //                 'path' => $filePath,
                //             ]);
                //         }
                //     })
                //     ->visibleOn(['create', 'edit']),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('category.name')
                    ->label('الفئة')
                    ->numeric()
                    ->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->label('العنوان')
                    ->searchable(),
                Tables\Columns\TextColumn::make('description')
                    ->label('الوصف')
                    ->searchable(),
                Tables\Columns\TextColumn::make('status')
                    ->label('الحالة'),
                Tables\Columns\TextColumn::make('price')
                    ->money()
                    ->label('السعر')
                    ->sortable(),

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
                    ->options(
                        fn(Category $query): array => $query->get()->pluck('name', 'id')->toArray()
                    )
                    ->label('الفئة'),
                Tables\Filters\SelectFilter::make('status')
                    ->label('الحالة')
                    ->options([
                        'active' => 'Active',
                        'inactive' => 'Inactive'
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
