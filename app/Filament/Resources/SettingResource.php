<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SettingResource\Pages;
use App\Models\Setting;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class SettingResource extends Resource
{

     public static function canViewAny(): bool
    {
        return auth()->user()->role === 'admin';
    }
    protected static ?string $model = Setting::class;

    protected static ?string $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static ?string $navigationLabel = 'الإعدادات العامة';
    protected static ?string $pluralLabel = 'الإعدادات';
    protected static ?string $modelLabel = 'إعداد';

    // منع إنشاء سجلات جديدة
    public static function canCreate(): bool
    {
        return false;
    }

    // منع حذف السجلات
    public static function canDelete($record): bool
    {
        return false;
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Settings')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('معلومات الشركة')
                            ->schema([
                                Forms\Components\TextInput::make('API_TITLE')
                                    ->label('اسم الشركة')
                                    ->required(),
                                Forms\Components\Textarea::make('API_Descraption')
                                    ->label('الوصف')
                                    ->rows(5),
                                Forms\Components\TextInput::make('API_location')
                                    ->label('العنوان')
                                    ->required(),
                            ]),

                        Forms\Components\Tabs\Tab::make('التواصل')
                            ->schema([
                                Forms\Components\TextInput::make('Numper_Phone')
                                    ->label('رقم الهاتف')
                                    ->tel(),
                                Forms\Components\TextInput::make('API_LinkFacebook')
                                    ->label('رابط فيسبوك')
                                    ->url(),
                                Forms\Components\TextInput::make('API_LinkInstagram')
                                    ->label('رابط انستغرام')
                                    ->url(),
                            ]),

                        Forms\Components\Tabs\Tab::make('الواتساب')
                            ->schema([
                                Forms\Components\Repeater::make('API_whatsappDepartments')
                                    ->label('أقسام الواتساب')
                                    ->schema([
                                        Forms\Components\TextInput::make('title')
                                            ->label('اسم القسم')
                                            ->required(),
                                        Forms\Components\TextInput::make('phoneNumber')
                                            ->label('رقم الهاتف')
                                            ->required(),
                                    ])
                                    ->defaultItems(1)
                                    ->columns(2),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('API_TITLE')->label('اسم الشركة'),
                Tables\Columns\TextColumn::make('Numper_Phone')->label('الهاتف'),
                Tables\Columns\TextColumn::make('API_LinkFacebook')
                    ->label('فيسبوك')
                    ->limit(30)
                    ->url(fn ($record) => $record->API_LinkFacebook)
                    ->openUrlInNewTab(),
            ])
            ->actions([
                Tables\Actions\EditAction::make()->label('تعديل'),
            ])
            ->bulkActions([]) // إزالة خيارات الحذف الجماعي
            ->headerActions([]) // إزالة زر الإنشاء
            ->emptyStateActions([]); // إزالة إجراءات الحالة الفارغة
    }

    public static function getRelations(): array
    {
        return [];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSettings::route('/'),
            'edit' => Pages\EditSetting::route('/{record}/edit'),
            // إزالة صفحة الإنشاء
        ];
    }

    // تخصيص العنوان في صفحة القائمة
    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count() > 0 ? 'متاح للتعديل' : 'غير متوفر';
    }
}
