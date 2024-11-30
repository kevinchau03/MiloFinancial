import { LayoutGrid, Home, Search, Settings, CircleDollarSign, LogIn } from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "WORTH!?",
        url: "/",
        icon: Search,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutGrid,
    },
    {
        title: "Settings",
        url: "/dashboard/settings",
        icon: Settings,
    },
    {
        title: "Budget",
        url: "/dashboard/budget",
        icon: CircleDollarSign,
    },
    {
        title: "Log In/Sign Up",
        url: "/signup",
        icon: LogIn,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>WORTH?!</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
