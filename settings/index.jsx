function HelloWorld(props) {
  return (
    <Page>
      (Color names must be in lower case)
      <TextInput label="Hour color" settingsKey="hourColor" type="text"/>
      <TextInput label="Minute color" settingsKey="minuteColor" type="text"/>
      <TextInput label="Month color" settingsKey="monthColor" type="text"/>
      <TextInput label="Date color" settingsKey="dateColor" type="text"/>
      <TextInput label="Background color" settingsKey="bgColor" type="text"/>
      <TextInput label="Steps color" settingsKey="stepsColor" type="text"/>
      <TextInput label="Calories color" settingsKey="calsColor" type="text"/>
      <TextInput label="Floors color" settingsKey="floorsColor" type="text"/>
      <TextInput label="Activity color" settingsKey="activityColor" type="text"/>
    </Page>
  );
}

registerSettingsPage(HelloWorld);
