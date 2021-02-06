# accounts.admin.py

from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin


from .forms import UserAdminCreationForm, UserAdminChangeForm
from .models import Profile

class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    form = UserAdminChangeForm
    add_form = UserAdminCreationForm

    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('id_user', 'gender', 'birth_date', 'first_name', 'last_name', 'email', 'is_admin')
    list_filter = ('is_admin', "gender")
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('gender', 'birth_date', 'first_name', 'last_name', 'phone', 'alert_stock', 'alert_price', 'alert_sms', 'alert_email')}),
        ('Permissions', {'fields': ('is_admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('gender', 'birth_date', 'first_name', 'last_name', 'email', 'password1', 'password2')}
        ),
    )
    search_fields = ('email',)
    ordering = ('id_user',)
    filter_horizontal = ()


admin.site.register(Profile, UserAdmin)



# Remove Group Model from admin. We're not using it.
admin.site.unregister(Group)