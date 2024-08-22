import { Component } from '@angular/core';
import { AuthService} from "../auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-accesspanel',
  templateUrl: './accesspanel.component.html',
  styleUrls: ['./accesspanel.component.css']
})
export class AccesspanelComponent {


  allUsers = [];
  public displayedColumns = ["Name", "Email", "role","changeRole", "active", "actions", "delete"];

  constructor(private userService:  AuthService,
              private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      // Filter out the user with id 1 and sort by active status
      this.allUsers = res
        .filter((userId: any) => userId.id !== 1)
        .sort((a: any, b: any) => (a.active === b.active) ? 0 : a.active ? -1 : 1);
    })
  }

  updateUserStatus(userId: number) {
    this.userService.updateUserStatus(userId).subscribe(res => {
      this.snackBar.open('User Status updated Successfully!', 'Close', {
        duration: 5000,
        horizontalPosition: "center",
        verticalPosition: "bottom"
      });
      this.getAllUsers();
    }, error => {
      this.snackBar.open(error.error, 'Close', {
        duration: 5000,
        horizontalPosition: "center",
        verticalPosition: "bottom"
      });
    })
  }

  deleteUser(userId: number) {
    if (confirm("Are you sure to delete this user?")) {
      this.userService.deleteUser(userId).subscribe(res => {
        this.snackBar.open('User deleted successfully!', 'Close', {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "bottom"
        });
        this.getAllUsers();
      }, error => {
        this.snackBar.open(error.error, 'Close', {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "bottom"
        });
      });
    }
  }

  changeUserRole(userId: number) {
    this.userService.changeUserRole(userId).subscribe(res => {
      this.snackBar.open('User role changed to CONFIRMED_USER!', 'Close', {
        duration: 5000,
        horizontalPosition: "center",
        verticalPosition: "bottom"
      });
      this.getAllUsers();
    }, error => {
      this.snackBar.open(error.error, 'Close', {
        duration: 5000,
        horizontalPosition: "center",
        verticalPosition: "bottom"
      });
    });
  }

  getActiveStatus(isActive: boolean): string {
    return isActive ? 'ACTIVE' : 'NEEDS APPROVAL';
  }

  getStatusClass(isActive: boolean): string {
    return isActive ? 'status-active' : 'status-needs-approval';
  }
}
