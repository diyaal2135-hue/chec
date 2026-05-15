"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Pencil, Trash2, Wifi, Shield, Clock, User, UserPlus, UserMinus, Settings } from "lucide-react"
import { WindowFrame } from "@/components/window-frame"
import { Sidebar } from "@/components/sidebar"
import { AltStatus } from "@/components/alt-status"
import { RankBadge, type RankType } from "@/components/rank-badge"
import { StatusBadge, type StatusType } from "@/components/status-badge"
import { LogoutModal } from "@/components/modals/logout-modal"
import { AddMemberModal } from "@/components/modals/add-member-modal"
import { TimeDisplay } from "@/components/time-display"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StaffMember {
  id: string
  name: string
  rank: RankType
  status: StatusType
  addedBy: string
}

interface Member {
  id: string
  username: string
  email: string
  joined: string
  lastActive: string
}

interface Role {
  id: string
  name: string
  color: string
  permissions: string[]
  memberCount: number
}

interface ActivityLog {
  id: string
  action: string
  user: string
  target: string
  timestamp: string
  type: "add" | "remove" | "edit" | "login"
}

const mockStaffList: StaffMember[] = [
  { id: "1", name: "Sackboiii", rank: "owner", status: "online", addedBy: "System" },
  { id: "2", name: "Kylian", rank: "manager", status: "online", addedBy: "Sackboiii" },
  { id: "3", name: "Squirelly", rank: "manager", status: "vanished", addedBy: "Sackboiii" },
  { id: "4", name: "Maverick_8622", rank: "srmod", status: "spectating", addedBy: "Sackboiii" },
  { id: "5", name: "PorkPro", rank: "srmod", status: "vanished", addedBy: "Sackboiii" },
  { id: "6", name: "jPhanned_", rank: "srmod", status: "offline", addedBy: "Sackboiii" },
]

const mockMembers: Member[] = [
  { id: "1", username: "Sackboiii", email: "sack@purpleprison.com", joined: "Jan 2023", lastActive: "Just now" },
  { id: "2", username: "Kylian", email: "kylian@purpleprison.com", joined: "Mar 2023", lastActive: "2 min ago" },
  { id: "3", username: "Squirelly", email: "squirelly@purpleprison.com", joined: "Apr 2023", lastActive: "5 min ago" },
  { id: "4", username: "Maverick_8622", email: "maverick@purpleprison.com", joined: "Jun 2023", lastActive: "1 hour ago" },
  { id: "5", username: "PorkPro", email: "porkpro@purpleprison.com", joined: "Jul 2023", lastActive: "3 hours ago" },
]

const mockRoles: Role[] = [
  { id: "1", name: "Owner", color: "text-red-500", permissions: ["All Permissions"], memberCount: 1 },
  { id: "2", name: "Manager", color: "text-orange-500", permissions: ["Manage Staff", "View Logs", "Edit Settings"], memberCount: 2 },
  { id: "3", name: "Sr Mod", color: "text-cyan-500", permissions: ["View Staff", "Moderate", "View Logs"], memberCount: 3 },
  { id: "4", name: "Mod", color: "text-blue-500", permissions: ["View Staff", "Moderate"], memberCount: 4 },
  { id: "5", name: "Helper", color: "text-green-500", permissions: ["View Staff"], memberCount: 6 },
  { id: "6", name: "Special", color: "text-yellow-500", permissions: ["View Staff", "Special Access"], memberCount: 2 },
]

const mockActivityLogs: ActivityLog[] = [
  { id: "1", action: "Added staff member", user: "Sackboiii", target: "NewHelper_01", timestamp: "2 min ago", type: "add" },
  { id: "2", action: "Removed staff member", user: "Kylian", target: "OldMod_99", timestamp: "15 min ago", type: "remove" },
  { id: "3", action: "Changed role", user: "Sackboiii", target: "PorkPro (Mod → Sr Mod)", timestamp: "1 hour ago", type: "edit" },
  { id: "4", action: "Logged in", user: "Maverick_8622", target: "", timestamp: "2 hours ago", type: "login" },
  { id: "5", action: "Added staff member", user: "Squirelly", target: "Trainee_Mike", timestamp: "3 hours ago", type: "add" },
  { id: "6", action: "Changed settings", user: "Sackboiii", target: "Auto-refresh enabled", timestamp: "5 hours ago", type: "edit" },
  { id: "7", action: "Logged in", user: "Kylian", target: "", timestamp: "6 hours ago", type: "login" },
  { id: "8", action: "Removed staff member", user: "Sackboiii", target: "InactiveStaff_22", timestamp: "1 day ago", type: "remove" },
]

export default function AdminPage() {
  const router = useRouter()
  const [showLogoutModal, setShowLogoutModal] = useState(false)
  const [showAddMemberModal, setShowAddMemberModal] = useState(false)
  const [activeTab, setActiveTab] = useState("staff")

  const handleLogout = () => {
    setShowLogoutModal(false)
    router.push("/login")
  }

  const handleAddMember = (data: { username: string; password: string; role: string }) => {
    console.log("Adding member:", data)
  }

  const getActionIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "add": return <UserPlus className="w-4 h-4 text-green-400" />
      case "remove": return <UserMinus className="w-4 h-4 text-red-400" />
      case "edit": return <Settings className="w-4 h-4 text-purple-400" />
      case "login": return <User className="w-4 h-4 text-blue-400" />
    }
  }

  return (
    <WindowFrame>
      <div className="flex h-full">
        <Sidebar onLogout={() => setShowLogoutModal(true)} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20">
            <div>
              <h1 className="text-xl font-bold text-white">Admin Panel</h1>
              <p className="text-sm text-gray-400">Manage staff and application settings</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Your Role</span>
                <RankBadge rank="owner" />
              </div>
              <AltStatus connected={true} server="purpleprison.com" />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex-1 px-6 py-4 overflow-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <TabsList className="bg-black/30 border border-purple-500/20 p-1">
                  <TabsTrigger 
                    value="members" 
                    className="data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-400 data-[state=active]:shadow-[0_0_10px_rgba(168,85,247,0.3)] text-gray-400"
                  >
                    Members
                  </TabsTrigger>
                  <TabsTrigger 
                    value="staff" 
                    className="data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-400 data-[state=active]:shadow-[0_0_10px_rgba(168,85,247,0.3)] text-gray-400"
                  >
                    Staff
                  </TabsTrigger>
                  <TabsTrigger 
                    value="roles" 
                    className="data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-400 data-[state=active]:shadow-[0_0_10px_rgba(168,85,247,0.3)] text-gray-400"
                  >
                    Roles
                  </TabsTrigger>
                  <TabsTrigger 
                    value="logs" 
                    className="data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-400 data-[state=active]:shadow-[0_0_10px_rgba(168,85,247,0.3)] text-gray-400"
                  >
                    Activity Logs
                  </TabsTrigger>
                </TabsList>
                <Button
                  onClick={() => setShowAddMemberModal(true)}
                  className="bg-green-600 hover:bg-green-500 text-white font-semibold border-0 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Staff
                </Button>
              </div>

              {/* Staff Tab */}
              <TabsContent value="staff" className="flex-1 mt-0">
                <div className="glass-card rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/20">
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Staff Name</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Rank</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Status</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Added By</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockStaffList.map((staff) => (
                        <tr key={staff.id} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                          <td className="px-4 py-3 text-sm text-white font-medium">{staff.name}</td>
                          <td className="px-4 py-3">
                            <RankBadge rank={staff.rank} />
                          </td>
                          <td className="px-4 py-3">
                            <StatusBadge status={staff.status} />
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-400">{staff.addedBy}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors group">
                                <Pencil className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-red-500/20 transition-colors group">
                                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Members Tab */}
              <TabsContent value="members" className="flex-1 mt-0">
                <div className="glass-card rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-purple-500/20">
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Username</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Email</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Joined</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Last Active</th>
                        <th className="text-left px-4 py-3 text-sm font-medium text-gray-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockMembers.map((member) => (
                        <tr key={member.id} className="border-b border-purple-500/10 hover:bg-purple-500/5 transition-colors">
                          <td className="px-4 py-3 text-sm text-white font-medium flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-600/30 flex items-center justify-center">
                              <User className="w-4 h-4 text-purple-400" />
                            </div>
                            {member.username}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-400">{member.email}</td>
                          <td className="px-4 py-3 text-sm text-gray-400">{member.joined}</td>
                          <td className="px-4 py-3 text-sm text-green-400">{member.lastActive}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button className="p-2 rounded-lg hover:bg-purple-500/20 transition-colors group">
                                <Pencil className="w-4 h-4 text-gray-400 group-hover:text-purple-400" />
                              </button>
                              <button className="p-2 rounded-lg hover:bg-red-500/20 transition-colors group">
                                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              {/* Roles Tab */}
              <TabsContent value="roles" className="flex-1 mt-0">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockRoles.map((role) => (
                    <div key={role.id} className="glass-card rounded-xl p-4 hover:border-purple-500/40 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <Shield className={`w-5 h-5 ${role.color}`} />
                          <span className={`font-semibold ${role.color}`}>{role.name}</span>
                        </div>
                        <span className="text-xs text-gray-400 bg-black/30 px-2 py-1 rounded-full">
                          {role.memberCount} members
                        </span>
                      </div>
                      <div className="space-y-1">
                        {role.permissions.map((perm, i) => (
                          <div key={i} className="text-xs text-gray-400 flex items-center gap-1">
                            <span className="w-1 h-1 rounded-full bg-purple-500" />
                            {perm}
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 mt-4 pt-3 border-t border-purple-500/10">
                        <button className="flex-1 py-1.5 text-xs text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 rounded transition-colors">
                          Edit
                        </button>
                        <button className="flex-1 py-1.5 text-xs text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded transition-colors">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Activity Logs Tab */}
              <TabsContent value="logs" className="flex-1 mt-0">
                <div className="glass-card rounded-xl overflow-hidden">
                  <div className="divide-y divide-purple-500/10">
                    {mockActivityLogs.map((log) => (
                      <div key={log.id} className="px-4 py-3 flex items-center gap-4 hover:bg-purple-500/5 transition-colors">
                        <div className="w-8 h-8 rounded-full bg-black/30 flex items-center justify-center">
                          {getActionIcon(log.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white font-medium">{log.user}</span>
                            <span className="text-sm text-gray-400">{log.action}</span>
                            {log.target && (
                              <span className="text-sm text-purple-400">{log.target}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {log.timestamp}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-purple-500/20 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Wifi className="w-3 h-3 text-green-500" />
              <span className="text-green-400">Connected to purpleprison.com</span>
            </div>
            <TimeDisplay />
          </div>
        </div>
      </div>

      {/* Modals */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
      <AddMemberModal
        isOpen={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        onAdd={handleAddMember}
      />
    </WindowFrame>
  )
}
