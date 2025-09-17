<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasFactory;

    protected $fillable = [
        'API_TITLE',
        'API_Descraption',
        'Numper_Phone',
        'API_location',
        'API_LinkFacebook',
        'API_LinkInstagram',
        'API_whatsappDepartments'
    ];

    // تحويل JSON إلى array تلقائياً
    protected $casts = [
        'API_whatsappDepartments' => 'array',
    ];

    // دالة للحصول على الإعدادات (سجل واحد فقط)
    public static function getSettings()
    {
        return self::first() ?? new self();
    }

    // دالة للتحديث أو الإنشاء
    public static function updateOrCreateSettings(array $data)
    {
        $setting = self::first();

        if ($setting) {
            $setting->update($data);
        } else {
            $setting = self::create($data);
        }

        return $setting;
    }
}
