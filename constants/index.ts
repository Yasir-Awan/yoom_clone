// Sidebar link type definition
interface SidebarLink {
    label: string;
    route: string;
    imgUrl: string;
}

// Existing static sidebar links
export const sidebarLinks: SidebarLink[] = [
    {
        label: 'Home',
        route: '/',
        imgUrl: '/icons/Home.svg',
    },
    {
        label: 'Upcoming',
        route: '/upcoming',
        imgUrl: '/icons/upcoming.svg',
    },
    {
        label: 'Previous',
        route: '/previous',
        imgUrl: '/icons/previous.svg',
    },
    {
        label: 'Recordings',
        route: '/recordings',
        imgUrl: '/icons/Video.svg',
    },
    {
        label: 'Personal Room',
        route: '/personal-room',
        imgUrl: '/icons/add-personal.svg',
    },
];

// Define mapping for tabName to route and image URL
const tabNameMapping: Record<string, { route: string, imgUrl: string }> = {
    schedules: { route: '/schedules', imgUrl: '/icons/schedules.svg' },
    leaves: { route: '/leaves', imgUrl: '/icons/leaves.svg' },
    attendance: { route: '/attendance', imgUrl: '/icons/attendance.svg' },
    summary: { route: '/summary', imgUrl: '/icons/summary.svg' },
    employees: { route: '/employees', imgUrl: '/icons/employees.svg' },
    reporting: { route: '/reporting', imgUrl: '/icons/reporting.svg' },
    teams: { route: '/teams', imgUrl: '/icons/teams.svg' },
    projects: { route: '/projects', imgUrl: '/icons/projects.svg' },
    roles: { route: '/roles', imgUrl: '/icons/roles.svg' },
};

// Function to dynamically generate new sidebar links based on the user-specific tabNameToIndex
export function getMergedSidebarLinks(): SidebarLink[] {
    // Retrieve the updated tabNameToIndex from localStorage for the logged-in user
    const tabNameToIndexRaw = localStorage.getItem('tabNameToIndex');

    // Parse and validate the tabNameToIndex object
    let tabNameToIndex: Record<string, string> = {};
    if (tabNameToIndexRaw) {
        try {
            tabNameToIndex = JSON.parse(tabNameToIndexRaw);
        } catch (error) {
            console.error('Error parsing tabNameToIndex:', error);
        }
    }

    // Generate new sidebar links based on the dynamic tabNameToIndex
    const newSidebarLinks: SidebarLink[] = Object.keys(tabNameToIndex).map(key => {
        const tabName = tabNameToIndex[key];
        const linkData = tabNameMapping[tabName];

        if (linkData) { // Ensure that the tab name exists in the mapping
            return {
                label: tabName.charAt(0).toUpperCase() + tabName.slice(1), // Capitalize first letter of label
                route: linkData.route,
                imgUrl: linkData.imgUrl,
            };
        }
        return null;
    }).filter((link): link is SidebarLink => link !== null); // Filter out null values and type narrow

    // Merge existing static links with the dynamically generated links
    return [...sidebarLinks, ...newSidebarLinks];
}

// Usage example: Get merged sidebar links dynamically
const mergedSidebarLinks = getMergedSidebarLinks();

export { mergedSidebarLinks };

// Avatar images
export const avatarImages: string[] = [
    '/images/avatar-1.jpeg',
    '/images/avatar-2.jpeg',
    '/images/avatar-3.png',
    '/images/avatar-4.png',
    '/images/avatar-5.png',
];
