import { Component } from '@angular/core';
import { UserService } from './user.service';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent {
  userForm: FormGroup;
  institutionName:  any ;
  institutionZip: any;
  institutionLocation: any;
  id: any;
  adminId: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService

  ) {
    this.userForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
      phone: ['', Validators.required],
      oldPassword: [''],
      newPassword: ['', [Validators.required, this.passwordStrengthValidator]],
      confirmPassword: ['', [Validators.required, this.matchPasswords.bind(this)]]
    });
  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadInstitutionData();
    const userDetails = this.authService.getUserDetails();
    this.adminId = userDetails.userId;
    this.id = userDetails.institutionId;
  }

  loadUserData( ): void {
       
      // this.userService.getUser(this.adminId).subscribe(user => {
      //   this.userForm.patchValue({
      //     fullname: user.fullname,
      //     email: user.email,
      //     role: user.role,
      //     phone: user.phone
      //   });
      // });
  
      // Using mock data
      const mockUser = {
        fullname: 'Asher Brown',
        email: 'asher.brown@example.com',
        role: 'Stanbic',
        phone: '(537) 315-1481'
      };
  
      this.userForm.patchValue({
        fullname: mockUser.fullname,
        email: mockUser.email,
        role: mockUser.role,
        phone: mockUser.phone
      });
    }
  loadInstitutionData(): void {
    this.userService.getInstitutionData(this.id).subscribe(institution => {
      this.institutionName = institution.institutionName;
      this.institutionZip = institution.institutionCode;
      this.institutionLocation = institution.institutionLocation;
    });
  }
  passwordStrengthValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    const hasMinLength = value.length >= 8;

    const passwordValid = hasNumber && hasSpecialChar && hasMinLength;

    if (!passwordValid) {
      return { passwordStrength: true };
    }
    return null;
  };

  matchPasswords(control: AbstractControl): ValidationErrors | null {
    if (this.userForm) {
      const newPassword = this.userForm.get('newPassword')?.value;
      if (control.value !== newPassword) {
        return { passwordsMismatch: true };
      }
    }
    return null;
  }
  onSubmit(): void {
    if (this.userForm.valid) {
      // Assuming 'id' is a property of the form's value
      const { id, ...userData } = this.userForm.value;
      this.userService.updateUser(id, userData).subscribe({
        next: (response) => {
          console.log('User saved successfully', response);
          // Handle successful save here, e.g., redirect or display a success message
        },
        error: (error) => {
          console.error('Error saving user', error);
          // Handle error here, e.g., display an error message
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }
   
}
