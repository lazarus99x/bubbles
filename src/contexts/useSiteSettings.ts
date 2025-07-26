import { useContext } from "react";
import { SiteSettingsContext } from "./SiteSettingsContext.types";

export const useSiteSettings = () => useContext(SiteSettingsContext);
