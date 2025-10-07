using System;

namespace LibraryManagementApi.Models
{
    public class Member
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public DateTime JoinedDate { get; set; } = DateTime.UtcNow;
    }
}


