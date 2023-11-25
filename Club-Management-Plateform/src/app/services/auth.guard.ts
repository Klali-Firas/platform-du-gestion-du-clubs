import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { APIService } from '../services/api.service';
import { inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

export const canActivate: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => Promise<boolean> = async (route, state) => {
  const apiService = inject(APIService);
  const router = inject(Router);
  const token = localStorage.getItem('token');
  const clubData = JSON.parse(localStorage.getItem('clubData')!);

  if (!token || !clubData || clubData.isAdmin) {
    router.navigate(['/login']);
    return false;
  }

  try {

    const idParam = route.params['id'];
    const response = await lastValueFrom(apiService.checkIdValidity(idParam));
    if (response.valid) {
      return true;
    } else {
      router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    console.error(error);
    router.navigate(['/login']);
    return false;
  }
};
