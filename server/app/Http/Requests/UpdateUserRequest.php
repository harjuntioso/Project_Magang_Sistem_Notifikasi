<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            //
            'name'=> 'required|string|max:225',
            'email'=> 'required|string|email|max:225',
            'phone' => 'required|string|min:10|max:15',
             'password' => 
             ['confirmed',
              Password::min(8)]
        ];
    }
}
