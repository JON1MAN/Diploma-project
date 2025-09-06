import {UserDTO} from "../user/UserDTO";
import {Page} from "../welcome_page/Page";

export interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentPage: Page;
    onNavigate: (page: Page) => void;
    user: UserDTO | null;
}