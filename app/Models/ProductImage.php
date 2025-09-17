<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    protected $fillable = [
        'product_id',
         'path',
         'sort'
        ];

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * The "booted" method of the model.
     * This automatically sets the sort order for new images
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($image) {
            // If sort is not already set
            if (is_null($image->sort)) {
                $maxSort = static::where('product_id', $image->product_id)
                    ->max('sort');
                
                $image->sort = is_null($maxSort) ? 1 : $maxSort + 1;
            }
        });
    }
}
