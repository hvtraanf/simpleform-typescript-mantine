import { useForm } from "@mantine/form";
import { TextInput, Button, RadioGroup, Radio, Input } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates"; // Import DatePickerInput
import { useState } from "react"; // Import useState for managing date value

const RegistrationForm = () => {
  const [dob, setDob] = useState<Date | null>(null); // Manage state for the date input

  const form = useForm({
    initialValues: {
      name: "",
      phone: "",
      dob: null, // Initialize dob as null for DatePickerInput
      healthCheck: "",
      drivingLicense: "",
      confirmTestDate: "",
    },
    validate: {
      name: (value) =>
        value.length < 2 ? "Name must have at least 2 characters" : null,
      phone: (value) =>
        /^\d+$/.test(value) ? null : "Phone number must be numeric",
      dob: (value) => (value ? null : "Date of birth is required"), // Validate dob as required
    },
  });

  const handleDobChange = (date: Date | null) => {
    setDob(date); // Update the dob state
    form.setFieldValue("dob", date); // Update the form's dob value
  };

  // Clear form handler
  const handleClearForm = () => {
    form.reset(); // Reset form fields
    setDob(null); // Reset the dob state explicitly
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-center text-2xl font-bold mb-4">Đơn đăng ký</h1>
        <p className="text-center text-gray-500 mb-6">
          Please fill out the form below.
        </p>

        {/* Submit the form and log the values */}
        <form
          onSubmit={form.onSubmit((values) => {
            console.log({
              name: values.name,
              phone: values.phone,
              healthCheck: values.healthCheck,
              drivingLicense: values.drivingLicense,
              confirmTestDate: values.confirmTestDate,
              dob: dob, // Log dob from the local state
            });
            {
              handleClearForm();
            }
          })}
        >
          <TextInput
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            required
            className="mb-4"
            {...form.getInputProps("name")}
          />

          <TextInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            required
            className="mb-4"
            {...form.getInputProps("phone")}
          />

          {/* Date of Birth using DatePickerInput */}
          <Input.Wrapper
            label="Ngày sinh"
            required
            className="mb-4"
            error={form.errors.dob} // Display error if validation fails
          >
            <DatePickerInput
              valueFormat="DD/MM/YYYY"
              placeholder="Chọn ngày sinh"
              value={dob} // Assign the state value to the DatePickerInput
              onChange={handleDobChange} // Update state and form field value
              clearable={true} // Allow users to clear the date
              required
            />
          </Input.Wrapper>

          <RadioGroup
            label="Bạn đã khám sức khỏe chưa?"
            size="md"
            required
            {...form.getInputProps("healthCheck")}
          >
            <Radio value="checked" label="Đã khám" />
            <Radio value="notChecked" label="Chưa khám" />
          </RadioGroup>

          <RadioGroup
            label="Bạn có bằng ô tô không?"
            required
            className="mb-4"
            {...form.getInputProps("drivingLicense")}
          >
            <Radio value="yes" label="Có" />
            <Radio value="no" label="Không" />
          </RadioGroup>

          <RadioGroup
            label="Xác nhận đăng ký lịch thi 17/10"
            required
            className="mb-4"
            {...form.getInputProps("confirmTestDate")}
          >
            <Radio value="confirm" label="Xác nhận" />
          </RadioGroup>

          <div className="flex justify-between mt-6">
            <Button type="submit">Submit</Button>
            <Button type="button" color="red" onClick={handleClearForm}>
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
