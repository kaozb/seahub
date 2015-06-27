import os
from uuid import uuid4

from exam.decorators import fixture
from exam.cases import Exam
from seaserv import seafile_api, ccnet_threaded_rpc

from seahub.base.accounts import User

class Fixtures(Exam):

    @fixture
    def user(self):
        return self.create_user('test@test.com')

    @fixture
    def admin(self):
        return self.create_user('admin@test.com', is_staff=True)

    @fixture
    def repo(self):
        r = seafile_api.get_repo(self.create_repo())
        return r

    @fixture
    def file(self):
        return self.create_file(repo_id=self.repo.id,
                                parent_dir='/',
                                filename='test.txt',
                                username='test@test.com')

    @fixture
    def folder(self):
        return self.create_folder(repo_id=self.repo.id,
                                  parent_dir='/',
                                  dirname='folder',
                                  username='test@test.com')

    @fixture
    def group(self):
        return self.create_group(group_name='test_group',
                                 username=self.user.username)

    def create_user(self, email=None, **kwargs):
        if not email:
            email = uuid4().hex + '@test.com'

        kwargs.setdefault('email', email)
        kwargs.setdefault('is_staff', False)
        kwargs.setdefault('is_active', True)

        return User.objects.create_user(password='secret', **kwargs)

    def remove_user(self, email, source="DB"):
        ccnet_threaded_rpc.remove_emailuser(email, source)

    def create_repo(self, **kwargs):
        repo_id = seafile_api.create_repo('test-repo', '',
                                          'test@test.com', None)
        return repo_id

    def remove_repo(self):
        return seafile_api.remove_repo(self.repo.id)

    def create_file(self, **kwargs):
        seafile_api.post_empty_file(**kwargs)
        return kwargs['parent_dir'] + kwargs['filename']

    def create_folder(self, **kwargs):
        seafile_api.post_dir(**kwargs)
        return kwargs['parent_dir'] + kwargs['dirname']

    def remove_folder(self):
        seafile_api.del_file(self.repo.id, os.path.dirname(self.folder),
                             os.path.basename(self.folder), self.user.username)

    def create_group(self, **kwargs):
        group_name = kwargs['group_name']
        username = kwargs['username']
        group_id = ccnet_threaded_rpc.create_group(group_name, username)
        return ccnet_threaded_rpc.get_group(group_id)

    def remove_group(self):
        return ccnet_threaded_rpc.remove_group(self.group.id, self.user.username)
