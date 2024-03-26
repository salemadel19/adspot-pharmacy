export interface ILoginCredentials {
  username: string;
  password: string;
}
export interface ILoggedUser {
  client_id: string;
  clientName: string;
  clientID: string;
  accessToken: string;
}

export interface IProductVideoIDAndDate {
  video_id: string;
  start_date: string;
  end_date: string;
}

export interface IPassagePerDate {
  diffusion_number_date: string;
  total: string;
}
export interface IPassagePerRange {
  diffusion_range: string;
  total: string;
}

export interface IDiffusionTotalStatus {
  pending: number;
  active: number;
  expired: number;
  refused: number;
}

export interface IRegion {
  contact_region: string;
  count: string;
}
export interface ITvRegion {
  contact_id: string;
  contact_firstname: string;
  contact_lastname: string;
  contact_wilaya: string;
  contact_city: string;
  contact_email: string;
  contact_establishment: string;
  contact_sexe: string;
  contact_sector: string;
  contact_nbr_visotors: string;
  contact_waiting_duration: string;
  contact_soncas: string;
  contact_address: string;
  contact_phone: string;
  contact_location: null;
  created_at: string;
  modified_at: string;
  created_by: string;
  modified_by: string;
  contact_avatar_url: string;
  contact_age: string;
  contact_region: string;
  tv_type: string;
  tv_position: string;
  tv_internet_connection: string;
  tv_last_connection: string;
  tv_last_error: string;
  tv_last_error_description: string;
  tv_id: string;
}
export interface ICurrentDiffusions {
  video_id: string;
  video_name: string;
  diffusion_id: string;
  video_url: string;
  time_slot: string;
}
export interface ITvsStatus {
  tvs: ITvs[];
  total_tvs: number;
}
export interface ITvs {
  tv_type: string;
  tv_position: string;
  tv_internet_connection: string;
  tv_last_connection: string;
  tv_last_error: string;
  tv_last_error_description: string;
  tv_login_id: string;
  tv_serial_number: string;
  tv_modem_phone: string;
  tv_size: string;
  tv_id: string;
  tv_status: string;
  tags: string[];
  contact_id: string;
  contact_firstname: string;
  contact_lastname: string;
  contact_wilaya: string;
  contact_city: string;
  contact_address: string;
  contact_location: { x: string; y: string };
  created_at: string;
  modified_at: string;
  created_by: string;
  modified_by: string;
  contact_avatar_url: string;
  contact_age: string;
  contact_region: string;
  isLoading: boolean;
  location_existence: boolean;
  installed: boolean;
  isSelected: boolean;
}
export interface IDashboardDiffusionList {
  diffusion_id: string;
  video_id: string;
  video_name: string;
  total_ttc: number;
  diffusion_start_date: string;
  diffusion_end_date: string;
  diffusion_range: string[];
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
  diffision_provinces: string;
  diffusion_type: string;
  diffusion_status: string;
  diffusion_regions: string[];
  client_id: string;
  video_path: string;
  video_validated: boolean;
  validated_by: string;
  video_length: string;
  video_thumb_path: string;
  video_product_name: string;
  video_product_description: string;
  landscape_video_link: string;
  landscape_thumb_link: string;
  tvs_count: string;
  space_time_slots: string[];
}
export interface IRangeData {
  range: string;
  imagePath: string;
  exist: boolean;
}

export interface IDashboard {
  diffussions: IDashboardDiffusionList[];
  passage: number;
  passageToday: number;
  passagePerDate: IPassagePerDate[];
  passagePerRange: IPassagePerRange[];
  total_tvs: number;
  total_spent: number;
  tvs: IHomeTvs[];
  tvsOnline: number;
  tvsOffline: number;
}
export interface IHomeTvs {
  tv_id: string;
  tv_last_connection: string;
  tv_status: string;
}

export interface ISpace {
  space_id: string;
  space_start_date: string;
  client_id: string;
  space_end_date: string;
  space_time_slots: string[];
  space_video_length: string;
  space_discount: string;
  space_tvs_ids: string[];
  created_at: string;
  created_by: string;
  space_daysLeft: number;
}

export interface IUserInfo {
  client_name: string;
  client_phone: string;
  client_email: string;
}
export interface IUserPwd {
  old_password: string;
  new_password: string;
}
export interface IProfileInfo {
  infos: IUserInfo;
  contracts: IContract[];
  invoices: IInvoice[];
  screensCount: string;
  maxBudget: string;
  totalScreens: string;
}
export interface IFolderCreation {
  folder_title: string;
  folder_description: string;
  client_id: string;
}

export interface IScreenFolder {
  folder_id: string;
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
  client_id: string;
  tv_ids: string[];
  folder_description: string;
  folder_title: string;
  isSelected: boolean;
  tvs_info: ITvsInfo[];
  offTvCount: number;
  onTvCount: number;
}
export interface ITvsInfo {
  tv_info: ITvInfo;
  tv_status: string;
}
export interface ITvInfo {
  tv_id: string;
  tv_size: string;
  tv_type: string;
  installed: boolean;
  contact_id: string;
  tv_login_id: string;
  tv_position: string;
  tv_last_error: string;
  tv_modem_phone: string;
  tv_serial_number: string;
  tv_last_connection: string;
  tv_internet_connection: string;
  tv_last_error_description: string;
}
export interface IContract {
  contract_id: string;
  contract_pack: string;
  tvs_count: string;
  contract_link: string;
  client_id: string;
  contract_start_date: string;
  contract_end_date: string;
  max_budjet_ttc: string;
  total_ttc: string;
  video_length: string;
  contract_discount: string;
  created_at: string;
  created_by: string;
  contract_name: string;
  spaces: ISpace[];
}
export interface IInvoice {
  invoice_id: string;
  invoice_date: string;
  invoice_dead_line: string;
  total_ht: string;
  total_ttc: string;
  invoice_link: string;
  invoice_number: string;
  invoice_paid: boolean;
}

export interface INotification {
  notification_id: string;
  created_at: string;
  created_by: string;
  modified_at: string;
  modified_by: string;
  seen_status: boolean;
  notification_content: string;
  client_id: string;
}
export interface IContractDetails {
  contract: IContract;
  space: ISpace;
  start_date: string;
}

export interface IClientEmail {
  client_email: string;
}
