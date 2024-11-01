import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TextInput, Button, RadioGroup, Radio } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";

type FormData = {
  name: string;
  phone: string;
  dob: Date | null;
  healthCheck: string;
  drivingLicense: string;
  confirmTestDate: string;
};

const RegistrationForm = () => {
  const [dob, setDob] = useState<Date | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      dob: null,
      healthCheck: "",
      drivingLicense: "",
      confirmTestDate: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log({
      ...data,
      dob: dob, // Including date of birth from the state
    });
  };

  const handleClearForm = () => {
    reset();
    setDob(null);
  };

  return (
    <div
      className="bg-white p-16 rounded-lg shadow-md"
      style={{ width: "30%", margin: "0 auto" }}
    >
      <div className="w-full bg-white p-12 rounded-lg shadow-md">
        <div className="w-full bg-blue-300 p-12 rounded-lg shadow-md">
          <h1 className="text-center text-3xl font-bold mb-6">Đơn đăng ký</h1>
          <p className="text-center text-lg text-gray-500 mb-8">
            Please fill out the form below.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            required
            className="mb-6 text-lg"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must have at least 2 characters",
              },
              pattern: {
                value: /^[A-Za-zÀ-ÿ\s]+$/,
                message: "Name must not contain numbers",
              },
            })}
            error={errors.name?.message}
          />

          <TextInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            required
            className="mb-6 text-lg"
            {...register("phone", {
              required: "Phone is required",
              pattern: {
                value: /^\d+$/,
                message: "Phone number must be numeric",
              },
            })}
            error={errors.phone?.message}
          />

          {/* Date of Birth using DatePickerInput */}
          <Controller
            control={control}
            name="dob"
            rules={{ required: "Date of birth is required" }}
            render={({ field }) => (
              <DatePickerInput
                label="Ngày sinh"
                valueFormat="DD/MM/YYYY"
                placeholder="Chọn ngày sinh"
                value={dob}
                onChange={(date) => {
                  setDob(date);
                  field.onChange(date);
                }}
                clearable={true}
                required
                classNames={{
                  input: "h-10 p-2 text-base cursor-pointer",
                  calendarHeader: "mantine-DatePickerInput-calendarHeader", // Center-align and add vertical padding
                  calendarHeaderControl:
                    "mantine-DatePickerInput-calendarHeaderControl", // Smaller controls for arrow buttons
                }}
                error={errors.dob?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="healthCheck"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <RadioGroup
                label="Bạn đã khám sức khỏe chưa?"
                required
                className="mt-6 mb-6 text-lg"
                {...field}
                error={errors.healthCheck?.message}
              >
                <Radio value="checked" label="Đã khám" />
                <Radio value="notChecked" label="Chưa khám" />
              </RadioGroup>
            )}
          />

          <Controller
            control={control}
            name="drivingLicense"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <RadioGroup
                label="Bạn có bằng ô tô không?"
                required
                className="mb-6 text-lg"
                {...field}
                error={errors.drivingLicense?.message}
              >
                <Radio value="yes" label="Có" />
                <Radio value="no" label="Không" />
              </RadioGroup>
            )}
          />

          <Controller
            control={control}
            name="confirmTestDate"
            rules={{ required: "This field is required" }}
            render={({ field }) => (
              <RadioGroup
                label="Xác nhận đăng ký lịch thi 17/10"
                required
                className="mb-6 text-lg"
                {...field}
                error={errors.confirmTestDate?.message}
              >
                <Radio value="confirm" label="Xác nhận" />
              </RadioGroup>
            )}
          />

          <div className="flex justify-between mt-8">
            <Button type="submit" size="lg">
              Submit
            </Button>
            <Button
              type="button"
              color="red"
              size="lg"
              onClick={handleClearForm}
            >
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
