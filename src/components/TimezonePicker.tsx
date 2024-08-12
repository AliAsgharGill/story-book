
import React from "react";
import { Select } from "antd";
import styled from "styled-components";
import moment from "moment-timezone";

const { Option } = Select;

export interface TimezonePickerProps {
  onChange?: (value: string | null) => void;
  style?: React.CSSProperties;
}

const tzAndPlaces: Record<string, string> = {
  "Etc/GMT+12": "International Date Line West",
  "Pacific/Midway": "Midway Island, Samoa",
  "Pacific/Honolulu": "Hawaii",
  "America/Juneau": "Alaska",
  "America/Dawson": "Pacific Time (US and Canada), Tijuana",
  "America/Boise": "Mountain Time (US and Canada)",
  "America/Chihuahua": "Chihuahua, La Paz, Mazatlan",
  "America/Phoenix": "Arizona",
  "America/Chicago": "Central Time (US and Canada)",
  "America/Regina": "Saskatchewan",
  "America/Mexico_City": "Guadalajara, Mexico City, Monterrey",
  "America/Belize": "Central America",
  "America/Detroit": "Eastern Time (US and Canada)",
  "America/Indiana/Indianapolis": "Indiana (East)",
  "America/Bogota": "Bogota, Lima, Quito",
  "America/Glace_Bay": "Atlantic Time (Canada)",
  "America/Caracas": "Caracas, La Paz",
  "America/Santiago": "Santiago",
  "America/St_Johns": "Newfoundland and Labrador",
  "America/Sao_Paulo": "Brasilia",
  "America/Argentina/Buenos_Aires": "Buenos Aires, Georgetown",
  "America/Godthab": "Greenland",
  "Etc/GMT+2": "Mid-Atlantic",
  "Atlantic/Azores": "Azores",
  "Atlantic/Cape_Verde": "Cape Verde Islands",
  GMT: "Dublin, Edinburgh, Lisbon, London",
  "Africa/Casablanca": "Casablanca, Monrovia",
  "Atlantic/Canary": "Canary Islands",
  "Europe/Belgrade": "Belgrade, Budapest, Ljubljana, Prague",
  "Europe/Sarajevo": "Sarajevo, Skopje, Warsaw, Zagreb",
  "Europe/Brussels": "Brussels, Copenhagen, Madrid, Paris",
  "Europe/Amsterdam": "Amsterdam, Berlin, Bern, Rome, Stockholm",
  "Africa/Algiers": "West Central Africa",
  "Europe/Bucharest": "Bucharest",
  "Africa/Cairo": "Cairo",
  "Europe/Helsinki": "Helsinki, Kiev, Riga, Sofia, Tallinn",
  "Europe/Athens": "Athens, Istanbul, Minsk",
  "Asia/Jerusalem": "Jerusalem",
  "Africa/Harare": "Harare, Pretoria",
  "Europe/Moscow": "Moscow, St. Petersburg, Volgograd",
  "Asia/Kuwait": "Kuwait, Riyadh",
  "Africa/Nairobi": "Nairobi",
  "Asia/Baghdad": "Baghdad",
  "Asia/Tehran": "Tehran",
  "Asia/Dubai": "Abu Dhabi, Muscat",
  "Asia/Baku": "Baku, Tbilisi, Yerevan",
  "Asia/Kabul": "Kabul",
  "Asia/Yekaterinburg": "Ekaterinburg",
  "Asia/Karachi": "Islamabad, Karachi, Tashkent",
  "Asia/Kolkata": "Chennai, Kolkata, Mumbai, New Delhi",
  "Asia/Kathmandu": "Kathmandu",
  "Asia/Dhaka": "Astana, Dhaka",
  "Asia/Colombo": "Sri Jayawardenepura",
  "Asia/Almaty": "Almaty, Novosibirsk",
  "Asia/Rangoon": "Yangon Rangoon",
  "Asia/Bangkok": "Bangkok, Hanoi, Jakarta",
  "Asia/Krasnoyarsk": "Krasnoyarsk",
  "Asia/Shanghai": "Beijing, Chongqing, Hong Kong SAR",
  "Asia/Kuala_Lumpur": "Kuala Lumpur, Singapore",
  "Asia/Taipei": "Taipei",
  "Australia/Perth": "Perth",
  "Asia/Irkutsk": "Irkutsk, Ulaanbaatar",
  "Asia/Seoul": "Seoul",
  "Asia/Tokyo": "Osaka, Sapporo, Tokyo",
  "Asia/Yakutsk": "Yakutsk",
  "Australia/Darwin": "Darwin",
  "Australia/Adelaide": "Adelaide",
  "Australia/Sydney": "Canberra, Melbourne, Sydney",
  "Australia/Brisbane": "Brisbane",
  "Australia/Hobart": "Hobart",
  "Asia/Vladivostok": "Vladivostok",
  "Pacific/Guam": "Guam, Port Moresby",
  "Asia/Magadan": "Magadan, Solomon Islands, New Caledonia",
  "Pacific/Fiji": "Fiji Islands, Kamchatka, Marshall Islands",
  "Pacific/Auckland": "Auckland, Wellington",
  "Pacific/Tongatapu": "Nuku'alofa",
};

const buildTZ = (id: string): { id: string; fullName: string; gmt: string } => {
  const momentTz = moment.tz(id);
  const offset = momentTz.utcOffset();
  const places = tzAndPlaces[id] ? tzAndPlaces[id] : "";
  const name = `${id}${places && " - " + places}`;
  const gmt = `GMT${offset ? momentTz.format("Z") : ""}`;
  const fullName = `${gmt} - ${name}`;
  return { id, fullName, gmt };
};

type Timezone = {
  id: string | null;
  fullName: string;
};

const timezones: Timezone[] = moment.tz
  .names()
  .filter((tz: string) => tzAndPlaces[tz]) // Explicit type for 'tz'
  .reduce(
    (acum: Timezone[], id: string) => [...acum, buildTZ(id)],
    [] as Timezone[]
  )
  .sort((a, b) => a.fullName.localeCompare(b.fullName))
  .concat({
    id: null,
    fullName: `Let my browser decide - Currently ${
      buildTZ(moment.tz.guess()).gmt
    }`,
  });

const StyledSelect = styled(Select)`
  width: 500px;
`;

const TimezonePicker: React.FC<TimezonePickerProps> = ({ onChange, style }) => (
  <StyledSelect
    showSearch
    style={style}
    placeholder="Select a timezone"
    optionFilterProp="children"
    onChange={(value) => onChange?.(value as string | null)}
    defaultValue={null}
    filterOption={(input, option) =>
      option?.children
        .toString()
        .toLowerCase()
        .indexOf(input.toLowerCase()) >= 0
    }
  >
    {timezones.map((tz) => (
      <Option key={tz.id} value={tz.id}>
        {tz.fullName}
      </Option>
    ))}
  </StyledSelect>
);

export default TimezonePicker;
