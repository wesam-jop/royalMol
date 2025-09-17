<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class SettingController extends Controller
{
    /**
     * عرض الإعدادات
     */
    public function index(): JsonResponse
    {
        try {
            $setting = Setting::first();

            if (!$setting) {
                return response()->json([
                    'success' => false,
                    'message' => 'لم يتم العثور على الإعدادات'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'API_TITLE' => $setting->API_TITLE,
                    'API_Descraption' => $setting->API_Descraption,
                    'Numper_Phone' => $setting->Numper_Phone,
                    'API_location' => $setting->API_location,
                    'API_LinkFacebook' => $setting->API_LinkFacebook,
                    'API_LinkInstagram' => $setting->API_LinkInstagram,
                    'API_whatsappDepartments' => $setting->API_whatsappDepartments ?? [],
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء جلب الإعدادات',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * تحديث الإعدادات
     */
    public function update(Request $request): JsonResponse
    {
        try {
            // التحقق من صحة البيانات
            $validatedData = $request->validate([
                'API_TITLE' => 'sometimes|string|max:255',
                'API_Descraption' => 'sometimes|string',
                'Numper_Phone' => 'sometimes|string|max:20',
                'API_location' => 'sometimes|string|max:500',
                'API_LinkFacebook' => 'sometimes|url|max:255',
                'API_LinkInstagram' => 'sometimes|url|max:255',
                'API_whatsappDepartments' => 'sometimes|array',
                'API_whatsappDepartments.*.title' => 'required_with:API_whatsappDepartments|string|max:100',
                'API_whatsappDepartments.*.phoneNumber' => 'required_with:API_whatsappDepartments|string|max:20',
            ]);

            // البحث عن الإعدادات الموجودة أو إنشاؤها
            $setting = Setting::updateOrCreateSettings($validatedData);

            return response()->json([
                'success' => true,
                'message' => 'تم تحديث الإعدادات بنجاح',
                'data' => [
                    'API_TITLE' => $setting->API_TITLE,
                    'API_Descraption' => $setting->API_Descraption,
                    'Numper_Phone' => $setting->Numper_Phone,
                    'API_location' => $setting->API_location,
                    'API_LinkFacebook' => $setting->API_LinkFacebook,
                    'API_LinkInstagram' => $setting->API_LinkInstagram,
                    'API_whatsappDepartments' => $setting->API_whatsappDepartments ?? [],
                ]
            ], 200);

        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'بيانات غير صحيحة',
                'errors' => $e->errors()
            ], 422);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء تحديث الإعدادات',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * جلب معلومات الشركة فقط
     */
    public function getCompanyInfo(): JsonResponse
    {
        try {
            $setting = Setting::first();

            if (!$setting) {
                return response()->json([
                    'success' => false,
                    'message' => 'لم يتم العثور على معلومات الشركة'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'company_name' => $setting->API_TITLE,
                    'description' => $setting->API_Descraption,
                    'location' => $setting->API_location,
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء جلب معلومات الشركة',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * جلب معلومات التواصل فقط
     */
    public function getContactInfo(): JsonResponse
    {
        try {
            $setting = Setting::first();

            if (!$setting) {
                return response()->json([
                    'success' => false,
                    'message' => 'لم يتم العثور على معلومات التواصل'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'phone' => $setting->Numper_Phone,
                    'facebook' => $setting->API_LinkFacebook,
                    'instagram' => $setting->API_LinkInstagram,
                    'whatsapp_departments' => $setting->API_whatsappDepartments ?? [],
                ]
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء جلب معلومات التواصل',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * جلب أقسام الواتساب فقط
     */
    public function getWhatsappDepartments(): JsonResponse
    {
        try {
            $setting = Setting::first();

            if (!$setting) {
                return response()->json([
                    'success' => false,
                    'message' => 'لم يتم العثور على أقسام الواتساب'
                ], 404);
            }

            return response()->json([
                'success' => true,
                'data' => $setting->API_whatsappDepartments ?? []
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'حدث خطأ أثناء جلب أقسام الواتساب',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
