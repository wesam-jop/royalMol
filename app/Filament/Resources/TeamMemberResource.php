<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TeamMemberResource\Pages;
use App\Models\TeamMember;
use Filament\Forms;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Grid;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;

class TeamMemberResource extends Resource
{
    protected static ?string $model = TeamMember::class;
    protected static ?string $navigationIcon = 'heroicon-o-user-group';
    protected static ?string $navigationLabel = 'أعضاء الفريق';
    protected static ?string $navigationGroup = 'المحتوى';

    public static function form(Form $form): Form
    {
        return $form->schema([
            Section::make('البيانات الأساسية')
                ->schema([
                    Grid::make(12)->schema([
                        TextInput::make('name')->label('الاسم')->required()->maxLength(255)->columnSpan(6),
                        TextInput::make('role')->label('الوظيفة')->maxLength(255)->columnSpan(6),
                        Textarea::make('bio')->label('نبذة')->rows(4)->columnSpan(12),
                    ]),
                ])->columns(1),

            Section::make('الصورة')
                ->schema([
                    FileUpload::make('avatar')
                        ->label('الصورة')
                        ->image()
                        ->directory('team')
                        ->visibility('public')
                        ->imageEditor()
                        ->imageCropAspectRatio('1:1')
                        ->imageResizeTargetWidth('400')
                        ->imageResizeTargetHeight('400')
                        ->columnSpan(12),
                ]),

            Section::make('التواصل الاجتماعي')
                ->schema([
                    Repeater::make('social')
                        ->label('روابط التواصل')
                        ->schema([
                            Select::make('type')->label('المنصة')->options([
                                'facebook' => 'Facebook',
                                'twitter' => 'Twitter',
                                'linkedin' => 'LinkedIn',
                                'instagram' => 'Instagram',
                                'email' => 'Email',
                            ])->required(),
                            TextInput::make('url')->label('الرابط / البريد')->required(),
                        ])->columns(2)
                        ->columnSpan(12)
                        ->collapsed(false),
                ]),

            Section::make('إعدادات العرض')
                ->schema([
                    TextInput::make('sort')->numeric()->default(0)->label('الترتيب'),
                    Forms\Components\Toggle::make('is_active')->label('مفعل')->default(true),
                ])->columns(2),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('avatar')->label('الصورة')->disk('public'),
                TextColumn::make('name')->label('الاسم')->searchable()->sortable(),
                TextColumn::make('role')->label('الوظيفة')->searchable(),
                ToggleColumn::make('is_active')->label('مفعل'),
                TextColumn::make('sort')->label('الترتيب')->sortable(),
            ])
            ->defaultSort('sort', 'asc')
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTeamMembers::route('/'),
            'create' => Pages\CreateTeamMember::route('/create'),
            'edit' => Pages\EditTeamMember::route('/{record}/edit'),
        ];
    }
}


