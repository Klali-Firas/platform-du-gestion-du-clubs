import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/iuser';
import { Imember } from '../interfaces/imember';
import { IDemande } from '../interfaces/idemande';
import { Reservation } from '../interfaces/ireservation';
import { Material } from '../interfaces/imaterial';
import { Salle } from '../interfaces/isalle';
import { Stand } from '../interfaces/istand';
import { Chat } from '../interfaces/ichat';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  private apiUrl: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {
  }
  registerUser(user: { name: string; }): Observable<any> {
    return this.http.post(`${this.apiUrl}testing`, user);
  }
  signup(user: User): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(`${this.apiUrl}auth/signup`, user);
  }

  signin(user: { email: string; password: string }): Observable<{ token: string, id: string }> {
    return this.http.post<{ token: string, id: string }>(`${this.apiUrl}auth/signin`, user);
  }
  loginWithToken(): Observable<{ valid: boolean, decoded: any }> {
    // Check if there's a token in local storage
    const token = localStorage.getItem('token');

    // Send a request to the server to validate the token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<{ valid: boolean, decoded: any }>(`${this.apiUrl}auth/validate-token`, { headers })


  }
  checkIdValidity(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}auth/verify-id/${id}`;
    return this.http.get(url, { headers });
  }

  //Clubs Services
  getAllClubs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}service/clubs`);
  }

  getClubById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}service/clubs/${id}`);
  }

  toggleClubActivation(id: string, etat: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<any>(`${this.apiUrl}service/clubs/${id}/toggle`, { etat }, { headers });
  }


  addRoleToClub(clubId: string, role: string, isExclusive: boolean = false): Observable<any> {
    const url = `${this.apiUrl}service/clubs/${clubId}/add-role`;
    const body = { role, isExclusive };

    return this.http.put(url, body);
  }

  getClubRoles(clubId: string): Observable<{ roles: string[], exclusiveRoles: string[] }> {
    return this.http.get<{ roles: string[], exclusiveRoles: string[] }>(`${this.apiUrl}service/clubs/${clubId}/roles`);
  }


  //Members Service

  getAllMembers(): Observable<Imember[]> {
    return this.http.get<Imember[]>(`${this.apiUrl}service/members`);
  }

  getMemberById(id: string): Observable<Imember> {
    return this.http.get<Imember>(`${this.apiUrl}service/members/${id}`);
  }

  createMember(memberData: any): Observable<Imember> {
    return this.http.post<Imember>(`${this.apiUrl}service/members`, memberData);
  }

  updateMember(id: string, memberData: any): Observable<Imember> {
    return this.http.put<Imember>(`${this.apiUrl}service/members/${id}`, memberData);
  }

  deleteMember(id: string): Observable<Imember> {
    return this.http.delete<Imember>(`${this.apiUrl}service/members/${id}`);
  }

  getMembersByClubId(clubId: string): Observable<Imember[]> {
    return this.http.get<Imember[]>(`${this.apiUrl}service/members/by-club/${clubId}`);
  }

  deleteMemberFromClub(memberId: string, clubId: string): Observable<Imember> {
    return this.http.delete<Imember>(`${this.apiUrl}service/members/${memberId}/delete-from-club/${clubId}`);
  }

  // updateMemberRoleInClub(memberId: string, clubId: string, newRole: string): Observable<Imember> {
  //   return this.http.put<Imember>(`${this.apiUrl}/${memberId}service/members/update-role-in-club/${clubId}`, { newRole });
  // }
  addRoleToMember(clubId: string, memberId: string, role: string): Observable<any> {
    const url = `${this.apiUrl}/service/members/add-role`;
    const body = { clubId, memberId, role };
    return this.http.post(url, body);
  }

  //demandes Services

  // Get all demandes
  getAllDemandes(): Observable<IDemande[]> {
    return this.http.get<IDemande[]>(`${this.apiUrl}service/demandes`);
  }

  // Get demandes by club ID
  getDemandesByClubID(clubID: string): Observable<IDemande[]> {
    return this.http.get<IDemande[]>(`${this.apiUrl}service/demandes/by-club/${clubID}`);
  }

  // Create a new demande
  createDemande(demandeData: IDemande): Observable<IDemande> {
    return this.http.post<IDemande>(`${this.apiUrl}service/demandes`, demandeData);
  }

  // Update a demande (update response and etat fields)
  updateDemande(id: string, updatedData: { response?: string; etat?: string }): Observable<IDemande> {
    return this.http.put<IDemande>(`${this.apiUrl}service/demandes/${id}`, updatedData);
  }

  getDemandeById(Id: string): Observable<IDemande> {
    const url = `${this.apiUrl}service/demandes/${Id}`;
    return this.http.get<IDemande>(url);
  }

  //Reservations...
  //
  ///get-all-reservations
  getAllReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}service/reservations/get-all-reservations`);
  }

  getReservationById(id: string): Observable<Reservation> {
    return this.http.get<Reservation>(`${this.apiUrl}service/reservations/${id}`);
  }

  // Get reservations by club ID
  getReservationsByClubId(clubId: string): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.apiUrl}service/reservations/by-club/${clubId}`);
  }

  // Update reservation etat by ID
  updateReservation(id: string, updatedData: { reponse?: string; etat?: string }): Observable<Reservation> {
    return this.http.put<Reservation>(`${this.apiUrl}service/reservations/${id}/update-etat`, { updatedData });
  }

  // Create a new reservation
  createReservation(reservationData: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.apiUrl}service/reservations`, reservationData);
  }

  //Material Services 

  // Get all materials
  getAllMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.apiUrl}service/materials`);
  }

  // Get material by ID
  getMaterialById(id: string): Observable<Material> {
    return this.http.get<Material>(`${this.apiUrl}service/materials/${id}`);
  }

  // Create a new material
  createMaterial(materialData: Material): Observable<Material> {
    return this.http.post<Material>(`${this.apiUrl}service/materials`, materialData);
  }

  // Update a material
  updateMaterial(id: string, updatedData: Partial<Material>): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}service/materials/${id}`, updatedData);
  }

  // Delete a Material
  desactivateMaterial(id: string): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}service/materials/${id}/desactivate`, id);
  }
  activateMaterial(id: string): Observable<Material> {
    return this.http.put<Material>(`${this.apiUrl}service/materials/${id}/activate`, id);
  }


  //Salles Services

  // Get all Salles
  getAllSalles(): Observable<Salle[]> {
    return this.http.get<Salle[]>(`${this.apiUrl}service/salles`);
  }

  // Get Salle by ID
  getSalleById(id: string): Observable<Salle> {
    return this.http.get<Salle>(`${this.apiUrl}service/salles/${id}`);
  }

  // Create a new Salle
  createSalle(materialData: Salle): Observable<Salle> {
    return this.http.post<Salle>(`${this.apiUrl}service/salles`, materialData);
  }

  // Update a Salle
  updateSalle(id: string, updatedData: Partial<Salle>): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}service/salles/${id}`, updatedData);
  }

  // Delete a Salle
  desactivateSalle(id: string): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}service/salles/${id}/desactivate`, id);
  }
  activateSalle(id: string): Observable<Salle> {
    return this.http.put<Salle>(`${this.apiUrl}service/salles/${id}/activate`, id);
  }



  //Stands Services

  // Get all Stands
  getAllStands(): Observable<Stand[]> {
    return this.http.get<Stand[]>(`${this.apiUrl}service/stands`);
  }

  // Get Stand by ID
  getStandById(id: string): Observable<Stand> {
    return this.http.get<Stand>(`${this.apiUrl}service/stands/${id}`);
  }

  // Create a new Stand
  createStand(materialData: Stand): Observable<Stand> {
    return this.http.post<Stand>(`${this.apiUrl}service/stands`, materialData);
  }

  // Update a Stand
  updateStand(id: string, updatedData: Partial<Stand>): Observable<Stand> {
    return this.http.put<Stand>(`${this.apiUrl}service/stands/${id}`, updatedData);
  }

  // Delete a Stand
  desactivateStand(id: string): Observable<Stand> {
    return this.http.put<Stand>(`${this.apiUrl}service/stands/${id}/desactivate`, id);
  }
  activateStand(id: string): Observable<Stand> {
    return this.http.put<Stand>(`${this.apiUrl}service/stands/${id}/activate`, id);
  }

  //ChatServices

  //create Chat
  createChat(clubId: string, clubName: string): Observable<Chat> {
    return this.http.post<Chat>(`${this.apiUrl}service/chat/createChat`, { clubId, clubName });
  }

  //getChat
  getChat(clubId: string): Observable<Chat> {
    return this.http.get<Chat>(`${this.apiUrl}service/chat/getChat?clubId=${clubId}`);
  }

  //getAllChat
  getAllChats(): Observable<Chat[]> {
    return this.http.get<Chat[]>(`${this.apiUrl}service/chat/getAllChats`);
  }
  //addMessage to the Chat
  addMessage(clubId: string, content: string, senderIsAdmin: boolean): Observable<Chat> {
    return this.http.post<Chat>(`${this.apiUrl}service/chat/addMessage`, { clubId, content, senderIsAdmin });
  }
}
