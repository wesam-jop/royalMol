<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SettingSeeder extends Seeder
{
    /**
     * Run the database seeder.
     */
    public function run(): void
    {
        // التأكد من وجود سجل واحد فقط للإعدادات
        if (Setting::count() === 0) {
            Setting::create([
                'API_TITLE' => 'بازارلي',
                'API_Descraption' => 'بازارلي هو مول إلكتروني عصري يجمع كل ما تحتاجه في مكان واحد. يقدّم تجربة تسوّق سهلة وسريعة عبر الإنترنت مع تشكيلة واسعة من المنتجات تشمل الملابس، الإكسسوارات، الإلكترونيات، مستلزمات المنزل، وأكثر. هدفنا في بازارلي هو توفير تجربة تسوّق مريحة، آمنة، وبأسعار تناسب الجميع، مع خدمة توصيل سريعة ودعم عملاء على مدار الساعة.',
                'Numper_Phone' => '+970591234567',
                'API_location' => 'رام الله - فلسطين - شارع الإرسال - مجمع العامل التجاري - الطابق الثالث',
                'API_LinkFacebook' => 'https://facebook.com/advancedtech.ps',
                'API_LinkInstagram' => 'https://instagram.com/advancedtech.ps',
                'API_whatsappDepartments' => [
                    [
                        'title' => 'قسم المبيعات',
                        'phoneNumber' => '+970591234567'
                    ],
                    [
                        'title' => 'الدعم الفني',
                        'phoneNumber' => '+970592345678'
                    ],
                    [
                        'title' => 'خدمة العملاء',
                        'phoneNumber' => '+970593456789'
                    ],
                    [
                        'title' => 'الاستشارات التقنية',
                        'phoneNumber' => '+970594567890'
                    ]
                ]
            ]);

            $this->command->info('✅ تم إنشاء الإعدادات الافتراضية بنجاح');
        } else {
            $this->command->info('⚠️  الإعدادات موجودة بالفعل');
        }
    }
}
