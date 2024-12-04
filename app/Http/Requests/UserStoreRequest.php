<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if (request()->isMethod('post')) {
            return [
                'name' => 'required|string|max:358',
                'email' => 'required|string',
                'password' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];
        } else {
            return [
                'name' => 'required|string|max:358',
                'email' => 'required|string',
                'password' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ];
        }
    }
    public function message()
    {
        if (request()->isMethod('post')) {
            return [
                'name.required' => 'name is required !',
                'email.required' => 'email is required !',
                'password.required' => 'password is required !',
                'image.required' => 'image is required !',

            ];
        } else {
            return [
                'name.required' => 'name is required !',
                'email.required' => 'email is required !',
                'password.required' => 'password is required !',
                'image.required' => 'image is required !',
            ];
        }
    }
}
