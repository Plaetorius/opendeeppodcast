"use client"

import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/projectSidebar/navMain"
import { NavProjects } from "@/components/projectSidebar/navProjects"
import { NavSecondary } from "@/components/projectSidebar/navSecondary"
import { NavUser } from "@/components/projectSidebar/navUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/shadcn/sidebar"
import Image from "next/image"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "General",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
    },
    {
      title: "Whitepaper",
      url: "#",
      icon: Bot,
    },
    {
      title: "Performance",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Community",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Seekers",
          url: "#",
        },
        {
          title: "Validators",
          url: "#",
        },
        {
          title: "Wizards",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function ProjectSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="p-0 m-0 hover:bg-gray-200 active:bg-gray-400">
              <a href="#">
                <div className="flex aspect-square size-12 items-center justify-center rounded-lg bg-gray-300 text-sidebar-primary-foreground p-1.5">
                  <Image src="/logos/waizard.png" height={100} width={100} alt="Waizard's logo" className="rounded-sm"/>
                </div>
                <div className="grid flex-1 text-left text-sm ml-1 py-0">
                  <span className="truncate leading-none text-pink text-lg font-bold p-0">Waizard</span>
                  <span className="truncate text-light-pink text-xs p-0">Data collection</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
