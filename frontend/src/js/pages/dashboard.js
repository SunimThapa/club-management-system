import { showToast } from "../components/toast";

const flash = localStorage.getItem('flashMessage');
if (flash) {
    const { text, type } = JSON.parse(flash);
    showToast(text, type);
    localStorage.removeItem('flashMessage');
}
import { getMyProfile } from "../api/user.js";
import { getAllEvents } from "../api/event.js";
import { getMyRegistrations } from "../api/event_registration.js";
import { getMyAttendance } from "../api/event_attendance.js";
import { getAllAnnouncements } from "../api/announcements.js";
import { getAllClubs } from "../api/club.js";
import { getAllUsers } from "../api/user.js";

const sidebarMenu = document.getElementById("sidebarMenu");
const welcomeHeading = document.querySelector(".page-header h1");

const sidebarLinks = {
    member: [
        { icon: "../../../public/images/dh.png", label: "Dashboard", href: "/dashboard.html" },
        { icon: "../../../public/images/ticket.png", label: "My Registration", href: "/my-registrations.html" }
    ],
    club_admin: [
        { icon: "../../../public/images/dh.png", label: "Dashboard", href: "/dashboard.html" },
        { icon: "../../../public/images/calendar.png", label: "Manage Events", href: "/manage-events.html" },
        { icon: "../../../public/images/club.png", label: "Attendance", href: "/attendance.html" },
        { icon: "../../../public/images/announce.png", label: "My Announcements", href: "/manage-announcements.html" }
    ],
    super_admin: [
        { icon: "../../../public/images/dh.png", label: "Dashboard", href: "/dashboard.html" },
        { icon: "../../../public/images/club.png", label: "Manage Clubs", href: "/manage-clubs.html" },
        { icon: "../../../public/images/ticket.png", label: "Manage Users", href: "/manage-users.html" }
    ]
};

function renderSidebar(role){
    const links = sidebarLinks[role] || sidebarLinks.member;
    const currentPath = window.location.pathname;

    sidebarMenu.innerHTML = "";

    links.forEach(link => {
        const li = document.createElement("li");
        li.className = "menu-item";
        if (currentPath === link.href) li.classList.add("active");

        li.innerHTML = `<img src="${link.icon}" alt="" class="aicon">&nbsp;${link.label}`;
        li.addEventListener("click", () => window.location.href = link.href);

        sidebarMenu.appendChild(li);
    });
}

function setStat(index, number, label){
    document.getElementById(`stat${index}Number`).textContent = number;
    document.getElementById(`stat${index}Label`).textContent = label;
}
function setAnnouncement(index, name, time, message){
   document.getElementById(`club${index}Name`).textContent = name;
    document.getElementById(`post${index}Time`).textContent = time;
    document.getElementById(`announcement${index}Text`).textContent= message;
}
function setEvent(index, name, day, month, venue){
    document.getElementById(`event${index}Title`).textContent = name;
    document.getElementById(`date${index}Day`).textContent= day;
    document.getElementById(`date${index}Month`).textContent= month;
    document.getElementById(`event${index}Location`).textContent = venue;
}

async function loadMemberStats(user){
    try {
        const [regsRes, eventsRes, attendanceRes, announcementsRes] = await Promise.all([
            getMyRegistrations(),
            getAllEvents(),
            getMyAttendance(),
            getAllAnnouncements()
        ]);

        const upcomingCount = eventsRes.data.filter(e => new Date(e.event_date) > new Date()).length;
        const attendedCount = attendanceRes.data.filter(a => a.status === "present").length;

        setStat(1, regsRes.data.length, "My Registrations");
        setStat(2, upcomingCount, "Upcoming Events");
        setStat(3, attendedCount, "Events Attended");
        setStat(4, announcementsRes.data.length, "Announcements");

        const recentAnnouncement = announcementsRes.data.slice(0,2);
        console.log(recentAnnouncement);
        const mediumDate = recentAnnouncement.map(e => new Date(e.created_at).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          }));
          if (recentAnnouncement.length > 0) {
            setAnnouncement(1, recentAnnouncement[0].title, mediumDate[0]);
        }
        
        if (recentAnnouncement.length > 1) {
            setAnnouncement(2, recentAnnouncement[1].title, mediumDate[1]);
        }
        
    } catch (error) {
        console.error("Failed to load member stats:", error);
    }
}

async function loadClubAdminStats(user){
    try {
        const eventsRes = await getAllEvents();
        const myEvents = eventsRes.data.filter(e => e.club_id === user.club_id);
        const upcomingCount = myEvents.filter(e => new Date(e.event_date) > new Date()).length;

        const announcementsRes = await getAllAnnouncements();
        const myAnnouncements = announcementsRes.data.filter(a => a.created_by === user.user_id);

        setStat(1, myEvents.length, "My Events");
        setStat(2, upcomingCount, "Upcoming Events");
        setStat(3, myAnnouncements.length, "My Announcements");
        setStat(4, myEvents.filter(e => e.created_by === user.user_id).length, "Events Created");

    } catch (error) {
        console.error("Failed to load club admin stats:", error);
    }
}

async function loadSuperAdminStats(){
    try {
        const [clubsRes, usersRes, eventsRes, announcementsRes] = await Promise.all([
            getAllClubs(),
            getAllUsers(),
            getAllEvents(),
            getAllAnnouncements()
        ]);

        setStat(1, clubsRes.data.length, "Total Clubs");
        setStat(2, usersRes.data.length, "Total Users");
        setStat(3, eventsRes.data.length, "Total Events");
        setStat(4, announcementsRes.data.length, "Total Announcements");

    } catch (error) {
        console.error("Failed to load super admin stats:", error);
    }
}
async function loadAnnouncements() {
        try {
            const  announcementsRes = await getAllAnnouncements();
    
            const recentAnnouncement = announcementsRes.data.slice(0,2);
            console.log(recentAnnouncement);
            const mediumDate = recentAnnouncement.map(e => new Date(e.created_at).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              }));
              if (recentAnnouncement.length > 0) {
                setAnnouncement(1, recentAnnouncement[0].title, mediumDate[0], recentAnnouncement[0].message);
            }
            
            if (recentAnnouncement.length > 1) {
                setAnnouncement(2, recentAnnouncement[1].title, mediumDate[1], recentAnnouncement[1].message);
            }
            
        } catch (error) {
            console.error("Failed to load announcements:", error);
        }
    
}

async function loadEvents() {
    try{
        const eventRes= await getAllEvents();
        const recentEvents= eventRes.data.slice(0, 2);
        const mediumDates = recentEvents.map(e => {
            const dateObj = new Date(e.event_date);
            
            return {
              month: dateObj.toLocaleDateString('en-US', { month: 'short' }), 
              day: dateObj.toLocaleDateString('en-US', { day: 'numeric' }) 
            };
          });
        
          setEvent(1, recentEvents[0].title, mediumDates[0].day, mediumDates[0].month, recentEvents[0].venue);
          setEvent(2, recentEvents[1].title, mediumDates[1].day, mediumDates[1].month, recentEvents[1].venue);
    }catch(error){
        console.error("Failed to load events:", error)
    }
}

async function initDashboard(){
    try {
        const profileResponse = await getMyProfile();
        console.log(profileResponse)
        const user = profileResponse.data;
        const createEventBtn = document.getElementById("create-event-btn")

        welcomeHeading.textContent = `Welcome back, ${user.name}!`;

        renderSidebar(user.role);

        if (user.role === "club_admin"){
            createEventBtn.removeAttribute('hidden');
            await loadClubAdminStats(user);
        } else if (user.role === "super_admin"){
            await loadSuperAdminStats();
        } else {
            await loadMemberStats(user);
        }
        await loadAnnouncements();
        await loadEvents();

    } catch (error) {
        console.error("Dashboard init failed:", error);
    }
}

initDashboard();