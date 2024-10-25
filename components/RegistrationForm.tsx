import { useForm } from '@mantine/form';
import { TextInput, Button, RadioGroup, Radio, Input } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useState } from 'react';

const RegistrationForm = () => {
  const [dob, setDob] = useState<Date | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      phone: '',
      dob: null as Date | null,
      healthCheck: '',
      drivingLicense: '',
      confirmTestDate: '',
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must have at least 2 characters' : null),
      phone: (value) => (/^\d+$/.test(value) ? null : 'Phone number must be numeric'),
      dob: (value) => (value ? null : 'Date of birth is required'),
    },
  });

  const handleDobChange = (date: Date | null) => {
    setDob(date);
    form.setFieldValue('dob', date);
  };

  const handleClearForm = () => {
    form.reset();
    setDob(null);
  };

  return (
    <div className="bg-white p-16 rounded-lg shadow-md" style={{ width: '70%', margin: '0 auto' }}>
      <div className="w-full bg-white p-12 rounded-lg shadow-md">
        <h1 className="text-center text-3xl font-bold mb-6">Đơn đăng ký</h1>
        <p className="text-center text-lg text-gray-500 mb-8">Please fill out the form below.</p>

        <form
          onSubmit={form.onSubmit((values) => {
            console.log({
              name: values.name,
              phone: values.phone,
              dob: dob,
            });
          })}
        >
          <TextInput
            label="Họ và tên"
            placeholder="Nhập họ và tên"
            required
            className="mb-6 text-lg"
            {...form.getInputProps('name')}
          />

          <TextInput
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            required
            className="mb-6 text-lg"
            {...form.getInputProps('phone')}
          />

          {/* Date of Birth using DatePickerInput */}
          <Input.Wrapper
            label="Ngày sinh"
            required
            className="mb-6 text-lg"
            error={form.errors.dob}
          >
            <DatePickerInput
              valueFormat="DD/MM/YYYY"
              placeholder="Chọn ngày sinh"
              value={dob}
              onChange={handleDobChange}
              clearable={true}
              required
              className="text-lg"
            />
          </Input.Wrapper>

          <RadioGroup
            label="Bạn đã khám sức khỏe chưa?"
            size="lg"
            required
            className="mb-6 text-lg"
            {...form.getInputProps('healthCheck')}
          >
            <Radio value="checked" label="Đã khám" />
            <Radio value="notChecked" label="Chưa khám" />
          </RadioGroup>

          <RadioGroup
            label="Bạn có bằng ô tô không?"
            required
            className="mb-6 text-lg"
            {...form.getInputProps('drivingLicense')}
          >
            <Radio value="yes" label="Có" />
            <Radio value="no" label="Không" />
          </RadioGroup>

          <RadioGroup
            label="Xác nhận đăng ký lịch thi 17/10"
            required
            className="mb-6 text-lg"
            {...form.getInputProps('confirmTestDate')}
          >
            <Radio value="confirm" label="Xác nhận" />
          </RadioGroup>

          <div className="flex justify-between mt-8">
            <Button type="submit" size="lg">
              Submit
            </Button>
            <Button type="button" color="red" size="lg" onClick={handleClearForm}>
              Clear Form
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
