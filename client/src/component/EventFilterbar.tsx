import React, { useState } from "react";
import { DatePicker, Dropdown, Checkbox, Button } from "antd";
import type { RangePickerProps } from "antd/es/date-picker";
import "../App.css";

const { RangePicker } = DatePicker;

interface Category {
  id: number;
  name: string;
}

interface EventFilterbarProps {
  categories: Category[];
  onCategoriesChange?: (categoryNames: string[]) => void;
  onDateRangeChange?: (dates: [string, string] | null) => void;
  onSearchChange?: (keyword: string) => void;
}

const EventFilterbar: React.FC<EventFilterbarProps> = ({
  categories,
  onCategoriesChange,
  onDateRangeChange,
  onSearchChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [dateRange, setDateRange] = useState<[string, string] | null>(null);
  const [searchKeyword, setSearchKeyword] = useState<string>("");

  const handleCategoryToggle = (name: string, checked: boolean) => {
    const updated = checked
      ? [...selectedCategories, name]
      : selectedCategories.filter((c) => c !== name);
    setSelectedCategories(updated);
    onCategoriesChange?.(updated);
  };

  const handleDateChange: RangePickerProps["onChange"] = (dates, dateStrings) => {
    if (!dates) {
      setDateRange(null);
      onDateRangeChange?.(null);
    } else {
      const range: [string, string] = [dateStrings[0], dateStrings[1]];
      setDateRange(range);
      onDateRangeChange?.(range);
    }
  };

  const handleSearch = (value: string) => {
    setSearchKeyword(value);
    onSearchChange?.(value);
  };

  // Dropdown content
  const dropdownContent = (
    <div
      className="bg-white rounded-[12px] shadow-md inline-block px-[20px] py-[15px] min-w-[150px]"
      onClick={(e) => e.stopPropagation()}
    >
      {categories
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((cat) => (
          <div
            key={cat.id}
            className="flex items-center rounded-md px-2 py-1 cursor-pointer hover:bg-[#3EBAD080] whitespace-nowrap"
          >
            <Checkbox
              checked={selectedCategories.includes(cat.name)}
              onChange={(e) => handleCategoryToggle(cat.name, e.target.checked)}
              className="custom-checkbox"
            >
              {cat.name}
            </Checkbox>
          </div>
        ))}
    </div>
  );

  // ✅ ถ้ามีการเลือกหมวดหมู่ — แสดงชื่อหมวดหมู่ที่เลือก
    const buttonLabel =
    selectedCategories.length === 0
      ? "Category"
      : selectedCategories.length <= 2
      ? selectedCategories.join(", ")
      : `${selectedCategories.length} selected`;


  return (
    <div
      className="
        flex flex-wrap justify-center items-center gap-4
        md:gap-6 lg:gap-8
        font-sans font-semibold text-[18px]
        w-full
        px-3 md:px-6
      "
    >
      {/* Search Bar */}
      <div
        className="
          bg-white flex items-center rounded-[12px] px-[16px] py-[12px] shadow-sm
          w-full sm:w-[400px] md:w-[350px] lg:w-[400px] min-h-[62px]
        "
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={2.5}
          stroke='currentColor'
          className='size-6 md:size-8 pr-[8px]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
        <input
          type='text'
          placeholder='Search your events.'
          className='outline-none w-full text-text-black placeholder:text-support3 text-[18px]'
          value={searchKeyword}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      {/* Date Range Picker */}
      <div
        className="
          bg-white flex items-center rounded-[12px] px-[16px] py-[12px] shadow-sm
          w-full sm:w-[350px] md:w-[320px] lg:w-[350px]
          max-h-[62px]
        "
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          fill='currentColor'
          className='size-6 md:size-7 mr-[4px]'
        >
          <path
            fillRule='evenodd'
            d='M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z'
            clipRule='evenodd'
          />
        </svg>
        <RangePicker
          onChange={handleDateChange}
          bordered={false}
          format='MMM D, YYYY'
          placeholder={["Start", "End"]}
          className='custom-range-picker w-full text-[15px]'
          popupClassName='custom-range-picker-popup'
          suffixIcon={null}
        />
      </div>

      {/* Category Dropdown */}
      <Dropdown dropdownRender={() => dropdownContent} trigger={["click"]} placement='bottomCenter'>
        <Button
          className="
            custom-dropdown-button
            !h-[62px] md:!h-[62px]
            !py-[10px] !px-[16px]
            flex items-center justify-start
            bg-white font-sans font-semibold
            text-[18px] md:text-[18px]
            text-support3 rounded-[12px] shadow-sm border-none
            w-full sm:w-[120px] md:w-[160px]
            hover:!bg-gray-50 truncate
          "
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-5 md:size-6 text-text-black mr-1 shrink-0'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75'
            />
          </svg>
          <span className="truncate max-w-[200px]">{buttonLabel}</span>
        </Button>
      </Dropdown>
    </div>
  );
};

export default EventFilterbar;
