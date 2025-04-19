// import {
//     auth,
//     base,
//     dates,
//     hints,
//     projects,
//     roles,
//     sprints,
//     tasks,
//     templates,
//     users,
// } from '@/shared/api';
// import { KanbanTypes } from '@/shared/consts';
// import { TaskDependencyType } from '@/shared/lib';
// import { ISelectOption } from '@/shared/ui/atoms';
//
// export interface UserSchema {
//     currentUser: auth.UserRc | null;
//     token: string | null;
// }
//
// export interface RolesSchema {
//     roles: users.RoleRc[];
// }
//
// export interface PositionsSchema {
//     positions: roles.PositionRc[];
// }
//
// export interface CupsSchema {
//     cups: projects.Cup[];
// }
//
// export interface PbiProjectsSchema {
//     pbiProjects: projects.PbiProject[];
// }
//
// export interface ProjectTasksListSchema {
//     tasks: projects.ListProjectTaskRc[];
// }
//
// export interface ProjectSchema {
//     project: projects.ProjectRc | null;
//     entityForEdit: {
//         id: string;
//         prefillType?: 'edit' | 'create' | 'move';
//     };
//     activeDependencyType: TaskDependencyType;
//     descendantTasks: {
//         [key: string]: {
//             key: string;
//             title: string;
//             dependencyType: TaskDependencyType;
//             lag: number;
//             endDatePlanned: string;
//         };
//     };
//     ancestorTasks: {
//         [key: string]: {
//             key: string;
//             title: string;
//             dependencyType: TaskDependencyType;
//             lag: number;
//             endDatePlanned: string;
//         };
//     };
//     isProjectLaunching: boolean;
// }
//
// export interface KanbanSchema {
//     kanbanType: KanbanTypes;
//     kanbanTasks: Omit<tasks.TasksForKanbanResponse, 'user'>;
//     projectsFilter: ISelectOption[];
// }
//
// export interface CupPositionsSchema {
//     cupPositions: roles.CupPositionRc[];
// }
//
// export interface SprintsSchema {
//     sprints: sprints.SprintRc[];
// }
//
// export interface SprintTasksListSchema {
//     sprintTasks: projects.ListProjectTaskRc[];
// }
//
// export interface TemplateTasksListSchema {
//     tasks: projects.ListProjectTaskRc[];
//     historyUpdates: {
//         user?: templates.MinimalUserData;
//         date: number;
//         reason: string;
//         eventBody: templates.TaskEventEntityRc;
//     }[];
//     title: string;
// }
//
// export interface HintsSchema {
//     hints: hints.HintsRc[];
//     showHints: boolean;
// }
//
// export interface DatesSchema {
//     dates: dates.DatesControllerGetAllNonWorkingDatesApiResponse;
// }

export interface StateSchema {
    user: UserSchema;
    // roles: RolesSchema;
    // positions: PositionsSchema;
    // cups: CupsSchema;
    // pbiProjects: PbiProjectsSchema;
    // projectTasks: ProjectTasksListSchema;
    // project: ProjectSchema;
    // kanban: KanbanSchema;
    // sprints: SprintsSchema;
    // sprintTasks: SprintTasksListSchema;
    // templateTasks: TemplateTasksListSchema;
    // cupPositions: CupPositionsSchema;
    // [base.api.reducerPath]: ReturnType<typeof base.api.reducer>;
    // hints: HintsSchema;
    // dates: DatesSchema;
}

export { loginSuccessful, clearCurrentUser, reducer } from './base/slice';
